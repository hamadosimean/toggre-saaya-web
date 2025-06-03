import React from "react";
import { Link } from "react-router";
import logo from "../../assets/logo_toogre_sayaa.png";
import { Outlet } from "react-router";
function NavBar() {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img
              src={logo}
              alt="Toogre Sayaa Logo"
              className="h-12 w-12 rounded-full"
            />
          </Link>
        </div>
      </div>

      <Outlet />
    </>
  );
}

export default NavBar;
