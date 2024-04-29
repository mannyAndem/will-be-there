import "./forgot-password.scss";
import forgotPasswordHero from "../../assets/images/forgot-password-hero.png";
import { Link } from "react-router-dom";
import slogan from "../../assets/images/title.svg";
import ForgotPasswordForm from "./components/ForgotPasswordForm/ForgotPasswordForm";
import Header from "../../ui/Header/Header";
import Footer from "../Home/components/Footer/Footer";

const ForgotPassword = () => {
  return (
    <><Header />
    <div className="forgot-password-container">
      <div>
        <div className="brand-container">
          <img src={slogan} className="slogan" />
          <div className="img-container">
            <img
              src={forgotPasswordHero}
              alt="A cartoon image of people creating an event next to a calendar."
            />
          </div>
          <div className="text">
            <span>Locked out?</span>
            <p>Don’t sweat it! Take back your account in just a few clicks</p>
          </div>
        </div>
      </div>
      <div>
        <div className="header">
          <h1>
            Forgot <span className="accent">Password</span>
          </h1>
          <p>
            Please input your email address to receive an email to reset your
            password.
          </p>
        </div>
        <div className="form-container">
          <ForgotPasswordForm />
        </div>
        <div className="link-container">
          <Link to="/login">Back to Log in</Link>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ForgotPassword;
