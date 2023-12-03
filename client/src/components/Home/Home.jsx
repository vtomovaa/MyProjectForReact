import { NavLink } from "react-router-dom";
import "./Home.css";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext.jsx";

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="container home-container">
      <h2>Orchid website to find any orchidea you need!</h2>
      <div className="container buttons">
        <NavLink to="/all-orchids">
          <button className="btns">All Orchids</button>
        </NavLink>
        {isAuthenticated ? (
          <NavLink to="/logout"><button className="btns">Logout</button></NavLink>
        ) : (
          <>
            <NavLink to="/login">
              <button className="btns">Login</button>
            </NavLink>
            <NavLink to="/register">
              <button className="btns">Register</button>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
