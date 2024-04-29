import "./footer.scss"
import SocialMedia from "./SocialMedia/SocialMedia";
import NavBarFooter from "./FooterNavBar/NavBar";
const Footer = () => {
    return (
        <footer>
        <div className="footerContents">
            <div className="company">
                <h1>WILL.BE.THERE</h1>
                <h3>Crafting Unforgettable Moments, One Event at a Time! </h3>
            </div>
<NavBarFooter/>

        </div>
        <SocialMedia/>
        </footer>
      );
}
 
export default Footer;
