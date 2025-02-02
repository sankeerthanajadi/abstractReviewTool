import React from "react";
import "./Register.css";

const RegisterForm = () => {
  return (
    <form className="form">
      <p className="title">Register</p>
      <p className="message">Signup now and get full access to our application</p>

      <label>
        <input required placeholder="" type="text" className="input" />
        <span>User_ID</span>
      </label>

      <div className="flex">
        <label>
          <input required placeholder="" type="text" className="input" />
          <span>Username</span>
        </label>

        <label>
          <input required placeholder="" type="text" className="input" />
          <span>Password</span>
        </label>
      </div>

      <label>
        <input required placeholder="" type="email" className="input" />
        <span>Email</span>
      </label>

      <label>
        <select required className="input">
          <option value="" disabled selected></option>
          <option value="student">Student</option>
          <option value="guide">Guide</option>
          <option value="coordinator">Coordinator</option>
          <option value="hod">HOD</option>
        </select>
        <span>Role</span>
      </label>

      <button type="submit" className="submit">Submit</button>
      <p className="signin">
        Already have an account? <a href="#">Signin</a>
      </p>
    </form>
  );
};

export default RegisterForm;
