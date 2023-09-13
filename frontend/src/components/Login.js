// Login.js

import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router
import { login } from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = () => {
    const user = login(email, password);
    if (user) {
      setMessage(`Welcome, ${user.email}!`);
      // Show an alert for successful login
      alert("Login successful");
      // Redirect to the next page (you can replace '/dashboard' with your desired route)
      navigate("/dashboard");
    } else {
      setMessage("Invalid credentials");
    }
  };

  return (
    <div className="login_page">
      <h2>Login</h2>
      <input
        className="login_input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  );
}

export default Login;
