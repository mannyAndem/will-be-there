import { NavLink } from "react-router-dom";
import "./navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <NavLink
        to={"/"}
        className={({ isActive }) => (isActive ? `link active` : "link")}
      >
        <span>Home</span>
      </NavLink>

      <NavLink
        to={"/events"}
        className={({ isActive }) => (isActive ? `link active` : "link")}
      >
        <span>Events</span>
      </NavLink>

      <NavLink
        to={"/rsvp"}
        className={({ isActive }) => (isActive ? `link active` : "link")}
      >
        <span>RSVP</span>
      </NavLink>

      <NavLink
        to={"/tracker"}
        className={({ isActive }) => (isActive ? `link active` : "link")}
      >
        <span>Tracker</span>
      </NavLink>

      <NavLink
        to={"/faq"}
        className={({ isActive }) => (isActive ? `link active` : "link")}
      >
        <span>FAQ</span>
      </NavLink>
    </div>
  );
};

export default Navbar;
