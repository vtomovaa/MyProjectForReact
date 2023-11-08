import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="navbar-wrapper">
      <NavLink to="/"><h1>MyLogo</h1></NavLink>
      <ul className="nav-menu">
        <NavLink to="/"><li className="nav-list">Home</li></NavLink>
        <NavLink to="products"><li className="nav-list">Products</li></NavLink>
        <NavLink to="about"><li className="nav-list">About</li></NavLink>
        <NavLink to="contacts"><li className="nav-list">Contacts</li></NavLink>
      </ul>
      <div className="nav-buttons">
        <NavLink to="login"><button className="nav-button">Login</button></NavLink>
        <NavLink to="register"><button className="nav-button">Register</button></NavLink>
      </div>
    </div>
  );
};

export default NavBar;
