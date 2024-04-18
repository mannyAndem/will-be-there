import { useEffect } from "react";
import "./home.scss";
import { useAuthContext } from "../../contexts/AuthContext";
import { useGetCurrentUser } from "../../hooks/auth";
import Header from "../../ui/Header/Header";
import { Link } from "react-router-dom";
import HomePageButton from "../../ui/HomepageButton/HomepageButton";
const Home = () => {
  const { user } = useAuthContext();
  const { data, isPending, isError, isSuccess } = useGetCurrentUser();

  return <div className="home">
<div className="header_class">
<Link to={"/"} className="slogan">WILL.BE.THERE</Link>

<Header />
</div>

<div className="main_body">
  <div className="slang">
  Make it memorable “Yes”!
<div>
RSVP with Ease Using <span className="slogan">
WILL.BE.THERE
</span>
</div>
  </div>

  <div className="paragraph">
  Event planning can be a whirlwind, but RSVPs can be a breeze.  <span className="slogan white">WILL.BE.THERE</span> makes managing guest responses effortless, so you can focus on creating a memorable event.
  </div>

<div className="buttonWrapper">
<Link to={"/more"} ><HomePageButton className="more"
       >Learn More</HomePageButton></Link>

<Link to={"/create"}>
  
<HomePageButton className="create"
       >Create your own events now</HomePageButton> 
</Link>
</div>
       </div>
       
  </div>;
};

export default Home;
