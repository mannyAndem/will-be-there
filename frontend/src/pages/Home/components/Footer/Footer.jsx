import "./footer.scss"
import SocialMedia from "./SocialMedia/SocialMedia";
import NavBarFooter from "./FooterNavBar/NavBar";
const Footer = () => {
    return (
        <footer>
        <div className="footerContents">
            <div className="company">
                <h1>WILL.BE.THERE</h1>
                <h3>Lorem ipsum dolor sit amet consectetur. Lobortis lorem id nunc mi dictum parturient nisi. Lectus nunc eu velit volutpat facilisis eget ac. </h3>
            </div>
<NavBarFooter/>
{/* <SocialMedia/> */}
        </div>
        </footer>
      );
}
 
export default Footer;