import "./reset-password.scss";
import resetPasswordHero from "../../assets/images/reset-password-hero.png";
import { Link } from "react-router-dom";
import slogan from "../../assets/images/title.svg";
import ResetPasswordForm from "./components/ResetPasswordForm/ResetPasswordForm";
import Header from "../../ui/Header/Header";
import Footer from "../Home/components/Footer/Footer";

const ResetPassword = () => {
  return (
    <> <Header/>
    <div className="reset-password-container">
      <div>
        <div className="brand-container">
          <img src={slogan} className="slogan" />
          <div className="img-container">
            <img
              src={resetPasswordHero}
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
            Reset <span className="accent">Password</span>
          </h1>
        </div>
        <div className="form-container">
          <ResetPasswordForm />
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ResetPassword;
