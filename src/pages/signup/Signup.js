import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import "./Signup.css";
import AuthService from "../../services/auth-service";
import { useNavigate } from "react-router-dom";

export default function Signup() {

  let navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      navigate("/showing");
    }
  }, []);

  return (
    <>
      <div className="signup-container">
        <form className="signup-form-container">
          <h1>Sign up</h1>
          <TextField
            className="textfield"
            // id="outlined-required"
            label="Username"
            defaultValue=""
          />
          <TextField
            className="textfield"
            // id="outlined-password-input"
            label="Email"
            type="email"
          />
          <TextField
            className="textfield"
            // id="outlined-password-input"
            label="Password"
            type="password"
          />
          <Button className="button" variant="contained" type="submit">
            Sign Up
          </Button>
        </form>
      </div>
    </>
  );
}
