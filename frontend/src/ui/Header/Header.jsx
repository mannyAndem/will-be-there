import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Button from "../Button/Button";
import "./header.scss";

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="brand">
        WILL.BE.THERE
      </Link>
      <Navbar />
      <div>
        <Button size="sm">Log In</Button>
      </div>
    </header>
  );
};

export default Header;
