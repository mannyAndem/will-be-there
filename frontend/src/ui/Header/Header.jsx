import './header.scss'
import NavBar from "../../pages/Home/components/Header/NavBar/NavBar";
import DashboardLogin from "../../pages/Home/components/LoginButton/LoginButton";
const Header = () => {
    return ( 
      <div className="header">
          <NavBar />

<DashboardLogin />
      </div>
     );
}
 
export default Header;