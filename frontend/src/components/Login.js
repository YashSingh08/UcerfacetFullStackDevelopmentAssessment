// Login.js

import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { login } from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = login(email, password);
    if (user) {
      setMessage(`Welcome, ${user.email}!`);
      // Show an alert for successful login
      alert("Login successful");
      // Redirect to the next page
      navigate("/dashboard");
    } else {
      setMessage("Invalid credentials");
    }
  };

  return (
    <div className="login_page">
      <h2>Login</h2>
      <div className="login_inputs">
        <div className="email_input">
          <input
            className="email_field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="password_input">
          <input
            className="password_field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="login_button">
        <button onClick={handleLogin}>Login</button>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default Login;
