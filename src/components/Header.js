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

  const handleMyBookignsClick = () => {
    navigate("/mybookings");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="header-container">
      <div className="logo-container" onClick={handleLogoClick}>
        <img className="logo" src={Logo} alt="logo"></img>
        <h1 id="header-h1">CinemaApp</h1>
      </div>
      {currentUser ? (
        <div className="user-container">
          {currentUser.roles.includes("ROLE_ADMIN") && (
            <Button className="button" variant="contained" onClick={() => navigate("/admin")}>Admin Panel</Button>)}
          <Button className="button" variant="contained" onClick={handleMyBookignsClick}>
            My Bookings
          </Button>
          <Button className="button" variant="contained" onClick={logOut}>
            Logout
          </Button>
        </div>
      ) : (
        <LoginForm></LoginForm>
      )}
    </div>
  );
}
