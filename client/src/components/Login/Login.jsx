import { useContext } from "react";
import { useForm } from "../../hooks/useForm";
import AuthContext from "../../context/AuthContext.jsx";
import "../Register/Sign.css";

const Login = () => {
  const { loginSubmitHandler, serverErrors } = useContext(AuthContext);

  const { values, onChange, onSubmit } = useForm(loginSubmitHandler, {
    email: "",
    password: "",
  });

  console.log(serverErrors);

  return (
    <div className="sign-container">
      <div className="sign-form">
        <h1 className="sign-mark">Login</h1>
        <form onSubmit={onSubmit}>
          <label>Email</label>
          <input
            type="text"
            placeholder="Email..."
            value={values.email}
            name="email"
            onChange={onChange}
            required
          />
          {values.email && !values.email.includes("@") && (
            <p className="sign-warning">Email should be valid!</p>
          )}

          <label>Password</label>
          <input
            type="password"
            placeholder="Password..."
            value={values.password}
            name="password"
            onChange={onChange}
            required
          />

          {serverErrors?.login && (
            <div>
              <p className="sign-warning">{serverErrors?.login?.message}</p>
            </div>
          )}


          <input
            disabled={!values.email.includes("@") || values.password === ""}
            type="submit"
            value="Login"
            id="loginBtn"
            className="btn"
          />
        </form>

        <div className="sign-info">
          Don't have an account yet? <a href="/register">Register here</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
