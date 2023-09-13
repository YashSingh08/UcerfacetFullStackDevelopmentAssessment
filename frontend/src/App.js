// App.js

import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from "react-router-dom";

function App() {
  const [message, setMessage] = useState("");
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard message={message} />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
