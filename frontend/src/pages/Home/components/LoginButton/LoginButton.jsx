import { Link } from "react-router-dom";
import './login.scss';
const DashboardLogin = () => {
    return ( 
        <div className="login_button">
            <Link to="/login">Log in</Link>
        </div>
     );
}
 
export default DashboardLogin;