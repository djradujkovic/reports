import { NavLink } from "react-router-dom";
import "./NavBar.style.css";
import logo from "./sluzba-logo.png";
import { GetPages } from "../../helpers/GetStates";
import Themes from "../Themes/Themes";

const NavBar = () => {
  const pages = GetPages();
  return (
    <div className="navbar">
      <Themes />
      <div>
        <img src={logo} alt="logo" />
        {/* <img /> */}
        <span>Aplikacija za praćenje projekata</span>
      </div>
      {pages.map((page) => {
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
    </div>
  );
};

export default NavBar;
