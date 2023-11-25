import { useState } from "react";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = (event) => {
    event.preventDefault();
    // Implement your login logic here

    // Example: Check email and password, show errors if any
    if (!email || !password) {
      setErrors("Email and password are required.");
      return;
    }

    // Simulate loading state
    setIsLoading(true);

    // Simulate API call or any asynchronous operation
    setTimeout(() => {
      // Check if email and password are correct (replace with your authentication logic)
      if (email === "example@example.com" && password === "password123") {
        // Successful login, redirect or perform other actions
        console.log("Login successful");
      } else {
        setErrors("Invalid email or password.");
      }

      // Reset loading state
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="loginContainer">
      <div className="form">
        <h1>Login</h1>
        <form onSubmit={login}>
          <label>Email</label>
          <input
            type="text"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pattern="^[a-zA-Z0-9\.-]{4,}@[a-z]+\.[a-z]+$"
            required
          />
          <p className="error" style={{ display: email ? "none" : "block" }}>
            Email is required!
          </p>
          <p
            className="error"
            style={{
              display:
                email && !/^[a-zA-Z0-9\.-]{4,}@[a-z]+\.[a-z]+$/.test(email)
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
            maxLength="12"
          />
          <p className="error" style={{ display: password ? "none" : "block" }}>
            Password is required!
          </p>
          <p
            className="error"
            style={{
              display: password && password.length < 6 ? "block" : "none",
            }}
          >
            Password should have more than 6 characters!
          </p>
          <p
            className="error"
            style={{
              display: password && password.length > 12 ? "block" : "none",
            }}
          >
            Password should have less than 12 characters!
          </p>

          {errors && <p className="mainerror">{errors}</p>}

          <input
            disabled={email === "" || password === "" || isLoading}
            type="submit"
            value="Login"
            id="loginBtn"
            className="btn"
          />
        </form>

        <p className="text">
          Don't have an account yet? <a href="/register">Register here</a>
        </p>

        {isLoading && (
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
