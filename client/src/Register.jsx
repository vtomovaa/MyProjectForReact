import "./Register.css";
import { useAuthContext } from "../../context/AuthContext";
import { useForm } from "../../hooks/useForm";

const Register = () => {
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
          {serverErrors?.register && (
            <p className="field" style={{ textAlign: "center" }}>
              {serverErrors?.register}
            </p>
          )}
          <label>Avatar(optional)</label>
          <input
            className="avatar"
            type="file"
            name="avatar"
            onChange={onChange}
          />
          {values.file && (
            <img
              id="avatar"
              src={URL.createObjectURL(values.file)}
              alt="avatar"
            />
          )}
          <label>Username</label>
          <input
            type="text"
            placeholder="Username..."
            name="username"
            value={values.username}
            onChange={onChange}
          />

          <label>Email</label>
          <input
            type="text"
            placeholder="Email..."
            name="email"
            value={values.email}
            onChange={onChange}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Password..."
            name="password"
            value={values.password}
            onChange={onChange}
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Repeat Password..."
            name="rePass"
            value={values.rePass}
            onChange={onChange}
          />

          <input
            disabled={values.email === "" || values.password === ""}
            type="submit"
            value="Register"
            className="regBtn"
          />
        </form>

        <p className="text">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
