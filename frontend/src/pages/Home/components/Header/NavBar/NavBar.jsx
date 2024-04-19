import "./navbar.scss";
import OurEvents from "../../../../Events/OurEvents";
import { Link } from "react-router-dom";
const NavBar = () => {
    return ( 
        <div className="navBar">
            <Link to={"/"} className="Navhome active">Home</Link>

            <Link to={"/events"} className="event">Events</Link>

            <Link to={"/rsvp"} className="rsvp">RSVP</Link>

            <Link to={"/tracker"} className="tracker"> Tracker</Link>

            <Link to={"/faq"} className="faq">FAQ</Link>
        </div>
     );
}
 
export default NavBar;