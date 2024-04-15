import { FcGoogle } from "react-icons/fc";
import "./google-signup-button.scss";

const GoogleSignupButton = () => {
  const handleClick = () => {
    window.open(`${import.meta.env.VITE_BACKEND_URL}auth/google/redirect`);
  };

  return (
    <button className="signup-with-google" onClick={handleClick}>
      <FcGoogle size={30} />
      Sign In with Google
    </button>
  );
};

export default GoogleSignupButton;
