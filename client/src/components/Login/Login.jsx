import { useState } from "react";
import { useForm } from "../../hooks/useForm"
import { useAuthContext } from "../../context/authContext.jsx";
import "./Login.css";

const Login = () => {
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { onLoginSubmit, serverErrors } = useAuthContext(); 

  const { values, onChange, onSubmit } = useForm(onLoginSubmit, {
    email: "",
    password: ""
  });

  return (
    <div className="loginContainer">
      <div className="form">
        <h1>Login</h1>
        <form onSubmit={onSubmit}>
          <label>Email</label>
          <input
            type="text"
            placeholder="Email..."
            value={values.email}
            name="email"
            onChange={onChange}
            pattern="^[a-zA-Z0-9\.-]{4,}@[a-z]+\.[a-z]+$"
            required
          />
          <p className="error" style={{ display: values.email ? "none" : "block" }}>
            Email is required!
          </p>
          <p
            className="error"
            style={{
              display:
                values.email && !/^[a-zA-Z0-9\.-]{4,}@[a-z]+\.[a-z]+$/.test(values.email)
                  ? "block"
                  : "none",
            }}
          >
            Email should be valid!
          </p>

          <label>Password</label>
          <input
            type="password"
            placeholder="Password..."
            value={values.password}
            name="password"
            onChange={onChange}
            required
            minLength="6"
            maxLength="12"
          />
          <p className="error" style={{ display: values.password ? "none" : "block" }}>
            Password is required!
          </p>
          <p
            className="error"
            style={{
              display: values.password && values.password.length < 6 ? "block" : "none",
            }}
          >
            Password should have more than 6 characters!
          </p>
          <p
            className="error"
            style={{
              display: values.password && values.password.length > 12 ? "block" : "none",
            }}
          >
            Password should have less than 12 characters!
          </p>

          {errors && <p className="mainerror">{errors}</p>}

          <input
            disabled={values.email === "" || values.password === "" || isLoading}
            type="submit"
            value="Login"
            id="loginBtn"
            className="btn"
          />
        </form>

        <p className="text">
          Don't have an account yet? <a href="/register">Register here</a>
        </p>

      </div>
    </div>
  );
};

export default Login;
