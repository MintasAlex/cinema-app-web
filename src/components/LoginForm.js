import "./LoginForm.css";

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { Route } from "react-router-dom";
import AuthService from "../services/auth-service";
import Showing from "../pages/showing/Showing";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(username, password).then(
        () => {
          navigate("/showing");
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="login-form-container" onSubmit={handleLogin}>
      <TextField
        className="textfield"
        // id="outlined-required"
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        className="textfield"
        // id="outlined-password-input"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button className="button" variant="contained" type="submit">
        Login
      </Button>
    </form>
  );
}
