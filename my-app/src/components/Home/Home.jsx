import { NavLink } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="container home-container">
      <h2>Orchid website to find any orchidea you need!</h2>
      <div className="container buttons">
        <NavLink to="/all-orchids">
          <button>All Orchids</button>
        </NavLink>
        <NavLink to="/login">
          <button>Login</button>
        </NavLink>
        <NavLink to="/register">
          <button>Register</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
