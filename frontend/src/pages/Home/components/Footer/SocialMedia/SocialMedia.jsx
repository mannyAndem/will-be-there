import React from "react";
import { Link } from "react-router-dom";
import "./socialmedia.scss"
const SocialMedia = () => {
    return ( 
        <div className="mediaContainer">
            <div className="socialMedia">
<div className="encasing">
    {/* <Link to="https://x.com" target="_blank" className="mediaLinks"> <img src={Twitter} alt="Twitter" /></Link> */}
</div>

            </div>

            <div className="legalities">
                Privacy Policy | Terms of Service
            </div>
            <div className="copyright">
                2024 WILL.BE.THERE
            </div>
        </div>
     );
}
 
export default SocialMedia;