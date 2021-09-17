import { NavLink } from "react-router-dom";
import "./NavBar.style.css";
import logo from "./sluzba-logo.png";
import { GetPages, GetUser } from "../../helpers/GetStates";
import Themes from "../Themes/Themes";

const NavBar = () => {
  const pages = GetPages();
  const user = GetUser();
  return (
    <div className="navbar">
      <Themes />
      <div>
        <img src={logo} alt="logo" />
        {/* <img /> */}
        <span>Aplikacija za praćenje projekata</span>
      </div>
      {pages.map((page) => {
        if (!user.loggedIn) return null;
        // if (user.admin < page.admin) return null;
        if (!user.group.pages.includes(page.key)) return null;
        return (
          <NavLink
            key={page.key}
            exact
            to={`/${page.key}`}
            activeClassName="navactive"
          >
            {page.name}
          </NavLink>
        );
      })}
      {pages.map((page) => {
        if (!user.loggedIn) return null;
        // if (user.admin < page.admin) return null;
        if (!user.group.pages.includes(page.key)) return null;
        if (page.table) {
          return (
            <NavLink
              key={page.key}
              exact
              to={`/${page.key}/table`}
              activeClassName="navactive"
            >
              Tabela {page.name}
            </NavLink>
          );
        }
        return null;
      })}
      <NavLink exact to="/login" activeClassName="navactive">
        Login
      </NavLink>
    </div>
  );
};

export default NavBar;
