import { useForm } from "../../hooks/useForm";

import { useAuthContext } from "../../context/authContext.jsx";
import "./Register.css";

const Register=()=> {
    const { onRegisterSubmit, serverErrors } = useAuthContext(); 

    const { values, onChange, onSubmit } = useForm(onRegisterSubmit, {
      username: "",
      email: "",
      password: "",
      rePass: "",
      file: "",
    });

      return (
        <div className="registerContainer">
          <div className="form">
            <h1>Register</h1>
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
              {values.username && (
                <div>
                  <p className="error">{values.username.length < 4 && 'Username should have 4 characters!'}</p>
                  <p className="error">{values.username.length > 10 && "Username shouldn't have more than 10 characters!"}</p>
                </div>
              )}
    
              <label>Email</label>
              <input
                type="text"
                placeholder="Email..."
                name="email"
                value={values.email}
                onChange={onChange}
              />
              {values.email && (
                <div>
                  <p className="error">{!values.email.includes('@') && 'Email should be valid!'}</p>
                </div>
              )}
    
              <label>Password</label>
              <input
                type="password"
                placeholder="Password..."
                name="password"
                value={values.password}
                onChange={onChange}
              />
              {values.password && (
                <div>
                  <p className="error">{values.password.length < 6 && 'Password should have more than 6 characters!'}</p>
                  <p className="error">{values.password.length > 12 && 'Password should have less than 12 characters!'}</p>
                </div>
              )}
    
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Repeat Password..."
                name="rePass"
                value={values.rePass}
                onChange={onChange}
              />
              {values.rePass && (
                <div>
                  <p className="error">{values.rePass !== values.password && 'Passwords must be equal!'}</p>
                </div>
              )}
    
              {/* {errors && <p className="mainerror">{errors}</p>} */}
    
              <input
                disabled={values.email === "" || values.password === ""}
                type="submit"
                value="Register"
                className="regBtn"
              />
            </form>
    
            <p className="text">Already have an account? <a href="/login">Login here</a></p>
    
          </div>
        </div>
      );
};

export default Register;