import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Button from "../Button/Button";
import "./header.scss";
import { IoNotificationsSharp } from "react-icons/io5";
import { useAuthContext } from "../../contexts/AuthContext";

const Header = () => {
  const { user } = useAuthContext();
  const mobileMenu = () => {
    let menu = document.querySelector(".desktop");
    let close = document.querySelector(".menu");
    if (menu.style.display === "flex") {
      menu.style.display = "none";
      close.classList.remove("active");
    } else {
      menu.style.display = "flex";
      close.classList.add("active");
    }
  };

  return (
    <>
      <header className="desktop-header">
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
      <header className="mobile-header">
        <Link to="/" className="brand">
          WILL.BE.THERE
        </Link>
        <div className="menu-user-container">
          {user && (
            <div className="user-container">
              <div className="profile-image">{user.name[0].toUpperCase()}</div>
            </div>
          )}
          <div className="menu" onClick={mobileMenu}>
            <div className="lines"></div>

            <div className="lines"></div>

            <div className="lines"></div>
          </div>
        </div>
        <div className="desktop">
          <Navbar />
        </div>
      </header>
    </>
  );
};

export default Header;
