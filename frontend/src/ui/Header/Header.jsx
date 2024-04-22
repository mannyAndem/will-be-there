import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Button from "../Button/Button";
import "./header.scss";
import { IoNotificationsSharp } from "react-icons/io5";
import { useAuthContext } from "../../contexts/AuthContext";

const Header = () => {
  const { user } = useAuthContext();

  console.log(user);

  return (
    <header className="header">
      <Link to="/" className="brand">
        WILL.BE.THERE
      </Link>
      <Navbar />
      {!user ? (
        <div>
          <Link to="/login">
            <Button size="sm">Log In</Button>
          </Link>
        </div>
      ) : (
        <div className="user-container">
          <div className="bell-container">
            <IoNotificationsSharp className="icon" size={30} />
          </div>
          <div className="profile-image">{user.name[0].toUpperCase()}</div>
        </div>
      )}
    </header>
  );
};

export default Header;
