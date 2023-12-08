import { NavLink } from "react-router-dom";
import "./Home.css";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext.jsx";
import Path from "../../paths.js";


const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="container home-container">
      <h2>Orchid website to find any orchidea you need!</h2>
      <div className="container buttons">
        <NavLink to={Path.AllOrchids}>
          <button className="btns">All Orchids</button>
        </NavLink>
        {isAuthenticated ? (
          <NavLink to={Path.Logout}><button className="btns">Logout</button></NavLink>
        ) : (
          <>
            <NavLink to={Path.Login}>
              <button className="btns">Login</button>
            </NavLink>
            <NavLink to={Path.Register}>
              <button className="btns">Register</button>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
