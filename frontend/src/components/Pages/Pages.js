import { useEffect } from "react";

import { Route, Switch } from "react-router-dom";

import { useDispatch } from "react-redux";
import { GetPages } from "../../helpers/GetStates";
import { getPages } from "../../redux/actions/pages";

import PageLogic from "../Page/Page";

const Pages = () => {
  const pages = GetPages();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPages());
  }, [dispatch]);
  return (
    <Switch>
      {pages.map((page) => {
        return (
          <Route
            key={page.key}
            exact
            path={`/${page.key}`}
            render={() => <PageLogic page={page} />}
          />
        );
      })}
      {pages.map((page) => {
        if (page.table) {
          return (
            <Route
              key={`${page.key}`}
              exact
              path={`/${page.key}/table`}
              render={() => <PageLogic page={page} table />}
            />
          );
        }
        return null;
      })}
    </Switch>
  );
};

export default Pages;
