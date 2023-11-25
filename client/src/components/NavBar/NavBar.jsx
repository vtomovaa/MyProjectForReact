import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { useState } from "react";

const NavBar = () => {

  const [view, setView] = useState(false);

  const isLogged = false;

  const logout = () => {
    //when we have server
    //userService.logout();
    //history.push('/');
  };

  const menuClick = () => {
    setView(!view);
  };

  const clicking = () => {
    setView(false);
  };

  return (
    <div className="header">
      <NavLink to="/">
        <div className="logo">
        </div>
      </NavLink>

      <div className="main">
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          {/* <a href="" className="icon">
            <i className="fa fa-bars"></i>
          </a> */}
          <li><NavLink to="/all-orchids">All Orchids</NavLink></li>
          {isLogged && <li><NavLink to="/add">Add Orchid</NavLink></li>}
        </ul>
      </div>
      
      <div className="auth">
        <ul>
          {isLogged ? (
            <div className="dropdown">
              <button className="dropbtn">Profile. . .</button>
              <div className="dropdown-content">
                <NavLink to="/my-orchids">My Orchids</NavLink>
                <NavLink to="/favorites-profile">My Favorite Orchids</NavLink>
                <NavLink to="/profile-info">Profile Info</NavLink>
              </div>
            </div>
          ) : (
            <>
              <li><NavLink to="/login">Login</NavLink></li>
              <li><NavLink to="/register">Register</NavLink></li>
            </>
          )}
          {isLogged && <li><a onClick={logout}>Logout</a></li>}
        </ul>
      </div>

      <div className="mobile" style={view ? {} : { display: 'none' }}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/all-orchids">All Orchids</NavLink>
        {isLogged && <NavLink to="/add">Add Orchid</NavLink>}
        {isLogged && <NavLink to="/profile">My Orchids</NavLink>}
        {isLogged && <NavLink to="/favorites-profile">My Favorite Orchids</NavLink>}
        {isLogged && <NavLink to="/profile-info">Profile Info</NavLink>}
      </div>

      <div className="authorization">
        {!isLogged ? (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        ) : (
          <NavLink to="/logout" onClick={logout}>Logout</NavLink>
        )}
      </div>

      {/* <a href="" onClick={menuClick} className="icon">
        <i className="fa fa-bars">heloo</i>
      </a> */}
    </div>
  );
};

export default NavBar;
