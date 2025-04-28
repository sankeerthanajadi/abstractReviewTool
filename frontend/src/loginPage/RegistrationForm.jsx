

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import axios from "axios";
// import "./Register.css";

// const RegisterForm = () => {
//   const navigate = useNavigate(); // Initialize useNavigate
//  // const [role, setRole] = useState(""); // Store selected role
//   //const navigate = useNavigate();
//   const [userId, setUserId] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:3001/login", {
//         username,
//         password,
//       });

//       setMessage(response.data.message);

//       // Navigate based on role
//       if (role === "Student") {
//         navigate("/frontPageStudent/display");
//       } else if (role === "Guide") {
//         navigate("/guideInterface/guide");
//       } else if (role === "Coordinator") {
//         navigate("/coordinator/coordinatorPage");
//       } else {
//         setMessage("Invalid role selected.");
//       }
//     } catch (error) {
//       setMessage(error.response?.data?.error || "Login failed");
//     }
//   };

//   return (
//     <form className="form" onSubmit={handleSubmit}>
//       <p className="title">Login</p>
//       <p className="message">Enter your details to access the application</p>

//       <label>
//         <input
//           required
//           type="text"
//           className="input"
//           value={userId}
//           onChange={(e) => setUserId(e.target.value)}
//         />
//         <span>User_ID</span>
//       </label>

//       <div className="flex">
//         <label>
//           <input
//             required
//             type="text"
//             className="input"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <span>Username</span>
//         </label>

//         <label>
//           <input
//             required
//             type="password"
//             className="input"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <span>Password</span>
//         </label>
//       </div>

//       <label>
//         <input
//           required
//           type="email"
//           className="input"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <span>Email</span>
//       </label>

//       <label>
//         <select
//           required
//           className="input"
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//         >
//           <option value="" disabled></option>
//           <option value="Student">Student</option>
//           <option value="Guide">Guide</option>
//           <option value="Coordinator">Coordinator</option>
//           <option value="HOD">HOD</option>
//         </select>
//         <span>Role</span>
//       </label>

//       <button type="submit" className="submit">Login</button>
//       <p className="signin">
//         Don't have an account? <a href="#">Signup</a>
//       </p>

//       {message && <p className="message">{message}</p>}
//     </form>
//   );
// };

// export default RegisterForm;
// */
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const RegistrationForm = () => {
//   const [role, setRole] = useState(""); // Selected role
//   const [message, setMessage] = useState(""); // Error message
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!role) {
//       setMessage("Please select a role before logging in.");
//       return;
//     }

//     setMessage(""); // Clear any previous errors

//     // Redirect based on role
//     if (role === "Student") navigate("/frontPageStudent/display");
//     else if (role === "guide") navigate("/guideInterface/guide");
//     else if (role === "coordinator") navigate("/coordinator/coordinatorPage");
//     else setMessage("Invalid role selection. Please try again.");
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Select Role:</label>
//         <select value={role} onChange={(e) => setRole(e.target.value)}>
//           <option value="">-- Select Role --</option>
//           <option value="Student">Student</option>
//           <option value="guide">Guide</option>
//           <option value="coordinator">Coordinator</option>
//         </select>
//         <button type="submit">Login</button>
//       </form>
      
//       {/* Show error messages if login fails */}
//       {message && <p style={{ color: "red" }}>{message}</p>}
//     </div>
//   );
// };

// export default RegistrationForm;





import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
const RegistrationForm = () => {
  //const [userId, setUserId] = useState("");
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

    setMessage(""); // Clear previous errors

    // Redirect based on role
    switch (role) {
      case "Student":
        navigate("/frontPageStudent/display");
        break;
      case "Guide":
        navigate("/guideInterface/guide");
        break;
      case "Coordinator":
        navigate("/coordinator/coordinatorPage");
        break;
      case "HOD":
        navigate("/hod/dashboard"); // Example route, update accordingly
        break;
      default:
        setMessage("Invalid role selection. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Login</p>
        <p className="message">Enter your details to access the application</p>

        {/* User ID */}
        

        {/* Username and Password in a flex container */}
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

        {/* Email */}
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

        {/* Role Selection */}
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

        {/* Submit Button */}
        <button type="submit" className="submit">Login</button>

        {/* Signup Link */}
        <p className="signin">
          Don't have an account? <a href="#">Signup</a>
        </p>

        {/* Error Message */}
        {message && <p className="message" style={{ color: "red" }}>{message}</p>}
      </form>
    </div>
  );
};

export default RegistrationForm;
