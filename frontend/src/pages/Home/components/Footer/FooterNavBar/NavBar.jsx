import React from "react";
import "./nav.scss"
import { Link } from "react-router-dom";
const NavBarFooter = ({ title, description, links }) => {
    return (
       <>
        <div className="companyNav">
            <h1>
                Solutions
            </h1>
            <div className="linksContainer">
                <Link className="links" to="#">Knowledge sharing</Link>
                <Link className="links" to="#">Customer support</Link>
                <Link className="links" to="#">Customer insights</Link>
                <Link className="links" to="#">Case study</Link>
                <Link className="links" to="#">Pricing</Link>
            </div> </div>
            <div className="companyNav">
            <h1>
                Company
            </h1>
            <div className="linksContainer">
                <Link className="links" to="#">About</Link>
                <Link className="links" to="#">Service and support</Link>
                <Link className="links" to="#">Careers</Link>
                <Link className="links" to="#">Contact</Link>
                <Link className="links" to="#">More</Link>
            </div> </div>

            <div className="companyNav">
            <h1>
                Resources
            </h1>
            <div className="linksContainer">
                <Link className="links" to="#">Blog</Link>
                <Link className="links" to="#">Systems</Link>
                <Link className="links" to="#">Reviews</Link>
                <Link className="links" to="#">Security</Link>
                
            </div> </div>   
            </>
    );
};
export default NavBarFooter;