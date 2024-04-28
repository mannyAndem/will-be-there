import { Link } from "react-router-dom";
import Button from "../../../../ui/Button/Button";
import "./login-popup.scss";
import { useState } from "react";

const LoginPopup = ({ isLoggedIn }) => {
  const [visible, setVisible] = useState(!isLoggedIn);

  const closePopup = () => {
    setVisible(false);
  };

  return (
    <div className={visible ? "login-popup-background" : "login-popup-hidden"}>
      <div className="login-popup-container">
        <h4>Account</h4>
        <p>You're not logged in! How will you like to proceed?</p>
        <div className="buttons-container">
          <Link to="/login" style={{ width: "100%" }}>
            <Button>Create Account / Sign-in</Button>
          </Link>
          <Button variant="secondary" onClick={closePopup}>
            Continue as a Guest
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
