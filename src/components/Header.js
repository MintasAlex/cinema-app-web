import Logo from "./logo.png";
import "./Header.css";
import LoginForm from "./LoginForm";
import { useState, useEffect } from "react";
import AuthService from "../services/auth-service";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [currentUser, setCurrentUser] = useState(undefined);
  let navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="header-container">
      <div className="logo-container">
        <img className="logo" src={Logo} alt="logo"></img>
        <h1 id="header-h1">CinemaApp</h1>
      </div>
      {currentUser ? (
        <Button className="button" variant="contained" onClick={logOut}>
          Logout
        </Button>
      ) : (
        <LoginForm></LoginForm>
      )}
    </div>
  );
}
