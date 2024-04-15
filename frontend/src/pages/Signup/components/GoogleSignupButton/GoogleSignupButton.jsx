import { FcGoogle } from "react-icons/fc";
import "./google-signup-button.scss";

const GoogleSignupButton = () => {
  const handleClick = () => {
    location.replace("http://localhost:5000/api/auth/google", "_blank");
  };

  return (
    <button className="signup-with-google" onClick={handleClick}>
      <FcGoogle size={30} />
      Sign In with Google
    </button>
  );
};

export default GoogleSignupButton;
