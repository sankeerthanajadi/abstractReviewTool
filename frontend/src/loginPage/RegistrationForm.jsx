import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css"; 

const LoginForm = () => {
  const [userID, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!role) {
      setMessage("Please select a role before logging in.");
      return;
    }

    setMessage("");

    switch (role) {
      case "Student":
        navigate("/frontPageStudent/display");
        break;
      case "Guide":
        navigate("/guideInterface/guide");
        // window.location.href = "/guideInterface/guide.html";

        break;
      case "Coordinator":
        navigate("/coordinator/coordinator");
        break;
      case "HOD":
        navigate("/hod/dashboard");
        break;
      default:
        setMessage("Invalid role selection. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <p className="title">Login</p>
          <p className="message">Enter your details to access the application</p>

          <div className="flex">
            <label>
              <input
                required
                type="text"
                className="input"
                value={userID}
                onChange={(e) => setUsername(e.target.value)}
              />
              <span>UserID</span>
            </label>

            <label>
              <input
                required
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span>Password</span>
            </label>
          </div>

          <label>
            <input
              required
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>Email</span>
          </label>

          <label>
            <select
              required
              className="input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="" disabled></option>
              <option value="Student">Student</option>
              <option value="Guide">Guide</option>
              <option value="Coordinator">Coordinator</option>
              <option value="HOD">HOD</option>
            </select>
            <span>Role</span>
          </label>

          <button type="submit" className="submit">
            Login
          </button>

          <p className="signin">
            Don't have an account? <a href="#">Signup</a>
          </p>

          {message && <p className="error-message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
