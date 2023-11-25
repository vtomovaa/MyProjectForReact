import { useState } from "react";
import "./Register.css";

const Register=()=> {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        rePass: '',
      });
    
      const [file, setFile] = useState('');
      const [errors, setErrors] = useState('');
      const [isLoading, setIsLoading] = useState(false);
    
      const onChange = (event) => {
        const { name, value } = event.target;
    
        if (name === 'avatar') {
          setFile(URL.createObjectURL(event.target.files[0]));
        } else {
          setForm({
            ...form,
            [name]: value,
          });
        }
      };
    
      const register = (event) => {
        event.preventDefault();
        // Implement your registration logic here
    
        // Example: Check form fields, show errors if any
        if (!form.username || !form.email || !form.password || !form.rePass) {
          setErrors('All fields are required.');
          return;
        }
    
        if (form.password !== form.rePass) {
          setErrors('Passwords must be equal.');
          return;
        }
    
        // Simulate loading state
        setIsLoading(true);
    
        // Simulate API call or any asynchronous operation
        setTimeout(() => {
          // Check registration details, show errors if any (replace with your logic)
          if (form.email === 'example@example.com') {
            setErrors('Email already exists.');
          } else {
            // Successful registration, redirect or perform other actions
            console.log('Registration successful');
          }
    
          // Reset loading state
          setIsLoading(false);
        }, 1000);
      };
    
      return (
        <div className="registerContainer">
          <div className="form">
            <h1>Register</h1>
            <form onSubmit={register}>
              <label>Avatar(optional)</label>
              <input
                className="avatar"
                type="file"
                name="avatar"
                onChange={onChange}
              />
              {file && <img id="avatar" src={file} alt="avatar" />}
    
              <label>Username</label>
              <input
                type="text"
                placeholder="Username..."
                name="username"
                value={form.username}
                onChange={onChange}
              />
              {form.username && (
                <div>
                  <p className="error">{form.username.length < 4 && 'Username should have 4 characters!'}</p>
                  <p className="error">{form.username.length > 10 && "Username shouldn't have more than 10 characters!"}</p>
                </div>
              )}
    
              <label>Email</label>
              <input
                type="text"
                placeholder="Email..."
                name="email"
                value={form.email}
                onChange={onChange}
              />
              {form.email && (
                <div>
                  <p className="error">{!form.email.includes('@') && 'Email should be valid!'}</p>
                </div>
              )}
    
              <label>Password</label>
              <input
                type="password"
                placeholder="Password..."
                name="password"
                value={form.password}
                onChange={onChange}
              />
              {form.password && (
                <div>
                  <p className="error">{form.password.length < 6 && 'Password should have more than 6 characters!'}</p>
                  <p className="error">{form.password.length > 12 && 'Password should have less than 12 characters!'}</p>
                </div>
              )}
    
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Repeat Password..."
                name="rePass"
                value={form.rePass}
                onChange={onChange}
              />
              {form.rePass && (
                <div>
                  <p className="error">{form.rePass !== form.password && 'Passwords must be equal!'}</p>
                </div>
              )}
    
              {errors && <p className="mainerror">{errors}</p>}
    
              <input
                disabled={form.email === "" || form.password === "" || isLoading}
                type="submit"
                value="Register"
                className="regBtn"
              />
            </form>
    
            <p className="text">Already have an account? <a href="/login">Login here</a></p>
    
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

export default Register;