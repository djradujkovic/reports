import { useEffect } from "react";

import { Route, Switch } from "react-router-dom";

import { useDispatch } from "react-redux";
import { GetPages, GetUser } from "../../helpers/GetStates";
import { getPages } from "../../redux/actions/pages";

import PageLogic from "../Page/Page";
import Login from "../Auth/Login";
import { getUser } from "../../redux/actions/auth";

const Pages = () => {
  const pages = GetPages();
  const user = GetUser();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPages());
    dispatch(getUser());
  }, [dispatch]);

  return (
    <Switch>
      {pages.map((page) => {
        if (!user.loggedIn) return null;
        if (!user.group.pages.includes(page.key)) return null;
        return (
          <Route
            key={page.key}
            exact
            path={`/${page.key}`}
            render={() => <PageLogic page={page} user={user} />}
          />
        );
      })}
      {pages.map((page) => {
        if (!user.loggedIn) return null;
        if (user.admin < page.admin) return null;
        if (page.table) {
          return (
            <Route
              key={`${page.key}`}
              exact
              path={`/${page.key}/table`}
              render={() => <PageLogic page={page} user={user} table />}
            />
          );
        }
        return null;
      })}
      <Route exact path={"/login"} render={() => <Login />} />
    </Switch>
  );
};

export default Pages;
