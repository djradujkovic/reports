import "./Layout.style.css";

import NavBar from "../NavBar/NavBar";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
