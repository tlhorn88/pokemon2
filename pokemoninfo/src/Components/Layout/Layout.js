import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import './Layout.css';


function Layout() {
  return (
    <div className="layout">
      <NavBar />
      <div className="body">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;