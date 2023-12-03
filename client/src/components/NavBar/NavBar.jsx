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
      <NavLink to="/">
        <div className="logo"></div>
      </NavLink>

      <div className="main">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {/* <a href="" className="icon">
            <i className="fa fa-bars"></i>
          </a> */}
          <li>
            <NavLink to="/all-orchids">All Orchids</NavLink>
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
                <NavLink to="/my-orchids">My Orchids</NavLink>
                <NavLink to="/profile-info">Profile Info</NavLink>
              </div>
            </div>
          ) : (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </>
          )}
          {isAuthenticated && (
            <li>
              <NavLink to="/logout">
                <div>Logout</div>
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      {/* <div className="mobile" style={view ? {} : { display: 'none' }}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/all-orchids">All Orchids</NavLink>
        {isAuthenticated && <NavLink to="/add">Add Orchid</NavLink>}
        {isAuthenticated && <NavLink to="/profile">My Orchids</NavLink>}
        {isAuthenticated && <NavLink to="/favorites-profile">My Favorite Orchids</NavLink>}
        {isAuthenticated && <NavLink to="/profile-info">Profile Info</NavLink>}
      </div> */}

      {/* <div className="authorization">
        {!isAuthenticated ? (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        ) : (
          <NavLink to="/logout" onClick={logout}>Logout</NavLink>
        )}
      </div> */}

      {/* <a href="" onClick={menuClick} className="icon">
        <i className="fa fa-bars">heloo</i>
      </a> */}
    </div>
  );
};

export default NavBar;
