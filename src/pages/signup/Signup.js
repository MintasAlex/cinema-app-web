import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import "./Signup.css";
import AuthService from "../../services/auth-service";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      navigate("/showing");
    }
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    try { 
      await AuthService.signup(username, email, password).then(
        async () => {
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
    <>
      <div className="signup-container">
        <form className="signup-form-container" onSubmit={handleSignup}>
          <h1>Sign up</h1>
          <TextField
            className="textfield"
            id="signup-username-input"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            className="textfield"
            id="signup-email-input"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className="textfield"
            id="signup-password-input"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="button" variant="contained" type="submit">
            Sign Up
          </Button>
        </form>
      </div>
    </>
  );
}
