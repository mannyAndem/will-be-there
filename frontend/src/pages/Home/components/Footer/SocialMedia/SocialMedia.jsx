import React from "react";
import { Link } from "react-router-dom";
import Twitter from "../../../../../assets/images/Twitter.png";
import LinkedIn from "../../../../../assets/images/Linkedin.png";
import Facebook from "../../../../../assets/images/facebook.png"
import Instagram from "../../../../../assets/images/instagram-line.png"
import Yotube from "../../../../../assets/images/youtube.png"
import "./socialmedia.scss"
const SocialMedia = () => {
    return (
        <div className="mediaContainer">
            <div className="socialMedia">
                <div className="encasing">
                    <Link to="https://x.com" target="_blank" className="mediaLinks"> <img src={Twitter} alt="Twitter" /></Link>
                </div>
 <div className="encasing">
                    <Link to="https://youtube.com" target="_blank" className="mediaLinks"> <img src={Yotube} alt="Youtube" /></Link>
                </div>


                <div className="encasing">
                    <Link to="https://linkedin.com/in" target="_blank" className="mediaLinks"> <img src={LinkedIn} alt="LinkedIn" /></Link>
                </div>
               
                <div className="encasing">
                    <Link to="https://fb.com" target="_blank" className="mediaLinks"> <img src={Facebook} alt="Facebook" /></Link>
                </div>
                <div className="encasing">
                    <Link to="https://instagram.com" target="_blank" className="mediaLinks"> <img src={Instagram} alt="Instagram" /></Link>
                </div>
            </div>

            <div className="legalities">
                <Link>Privacy Policy</Link> <div className="vr"> </div><Link> Terms of Service</Link>
            </div>
            <div className="copyright">
                2024 WILL.BE.THERE
            </div>
        </div>
    );
}

export default SocialMedia;