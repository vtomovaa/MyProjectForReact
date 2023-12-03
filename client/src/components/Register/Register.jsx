import { useForm } from "../../hooks/useForm";

import AuthContext from "../../context/AuthContext.jsx";
import { useContext } from "react";
import "./Sign.css";

const Register = () => {
  const { registerSubmitHandler } = useContext(AuthContext);

  const { values, onChange, onSubmit } = useForm(registerSubmitHandler, {
    username: "",
    email: "",
    password: "",
    rePass: "",
    file: "",
  });

  const disabled =
    values.username.length < 4 ||
    values.username.length > 10 ||
    !values.email.includes("@") ||
    !values.password ||
    values.rePass !== values.password;

  return (
    <div className="sign-container">
      <div className="sign-form">
        <h1 className="sign-mark">Register</h1>
        <form onSubmit={onSubmit}>
          <label>Avatar(optional)</label>
          <input
            className="avatar"
            type="file"
            name="avatar"
            onChange={onChange}
          />
          {values.file && <img id="avatar" src={values.file} alt="avatar" />}

          <label>Username</label>
          <input
            type="text"
            placeholder="Username..."
            name="username"
            value={values.username}
            onChange={onChange}
          />
          {values.username &&
            (values.username.length < 4 || values.username.length > 10) && (
              <span>Username should have 4 characters!</span>
            )}

          <label>Email</label>
          <input
            type="email"
            placeholder="Email..."
            name="email"
            value={values.email}
            onChange={onChange}
          />
          {values.email && !values.email.includes("@") && (
            <span>Email should be valid!</span>
          )}

          <label>Password</label>
          <input
            type="password"
            placeholder="Password..."
            name="password"
            value={values.password}
            onChange={onChange}
          />
          {values.password &&
            (values.password.length < 6 || values.password.length > 12) && (
              <span>Password should have between 7 and 11 characters!</span>
            )}

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Repeat Password..."
            name="rePass"
            value={values.rePass}
            onChange={onChange}
          />
          {values.rePass && values.rePass !== values.password && (
            <span>Passwords must be equal!</span>
          )}

          <input
            disabled={disabled}
            type="submit"
            value="Register"
            className="regBtn"
          />
        </form>

        <div className="sign-info">
          Already have an account? <a href="/login">Login here</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
