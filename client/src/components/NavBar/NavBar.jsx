import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext.jsx";
import Path from "../../paths.js";

const NavBar = () => {
  const [view, setView] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  const menuClick = () => {
    setView(!view);
  };

  const clicking = () => {
    setView(false);
  };

  return (
    <div className="header">
      <NavLink to={Path.Home}>
        <div className="logo"></div>
      </NavLink>

      <div className="main">
        <ul>
          <li>
            <NavLink to={Path.Home}>Home</NavLink>
          </li>
          <li>
            <NavLink to={Path.AllOrchids}>All Orchids</NavLink>
          </li>
          {isAuthenticated && (
            <li>
              <NavLink to={Path.CreateOrchid}>Add Orchid</NavLink>
            </li>
          )}
        </ul>
      </div>

      <div className="auth">
        <ul>
          {isAuthenticated ? (
            <div className="dropdown">
              <button className="dropbtn btns">Profile. . .</button>
              <div className="dropdown-content">
                <NavLink to={Path.MyOrchids}>My Orchids</NavLink>
                <NavLink to={Path.Profile}>Profile Info</NavLink>
              </div>
            </div>
          ) : (
            <>
              <li>
                <NavLink to={Path.Login}>Login</NavLink>
              </li>
              <li>
                <NavLink to={Path.Register}>Register</NavLink>
              </li>
            </>
          )}
          {isAuthenticated && (
            <li>
              <NavLink to={Path.Logout}>
                <div>Logout</div>
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
