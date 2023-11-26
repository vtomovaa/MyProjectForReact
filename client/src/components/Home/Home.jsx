import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/authContext.jsx";
import "./Home.css";
import { Fragment } from "react";

const Home = () => {
  const { isAuthenticated, onLogout } = useAuthContext();
  const logout = () => {
    //when we have server
    
    onLogout();
  };

  return (
    <div className="container home-container">
      <h2>Orchid website to find any orchidea you need!</h2>
      <div className="container buttons">
        <NavLink to="/all-orchids">
          <button>All Orchids</button>
        </NavLink>
        {isAuthenticated ? (
          <NavLink to=""><button onClick={logout}>Logout</button></NavLink>
        ) : (
          <>
            <NavLink to="/login">
              <button>Login</button>
            </NavLink>
            <NavLink to="/register">
              <button>Register</button>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
