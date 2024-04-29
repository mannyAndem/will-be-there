import "./home.scss";
import Header from "../../ui/Header/Header";
import { Link } from "react-router-dom";
import HomePageButton from "../../ui/HomepageButton/HomepageButton";
import topBanner from "../../assets/images/banner.png";
import EventForm from "./components/CreateEventForm/Event";
import formPicture from "../../assets/images/form-picture.png";
import GuestsSect from "../../assets/images/Guests.png"
import Card from "./components/ComponentCard/MainComponent";
import Brands from "../../assets/images/brands.png";
import MainAlbum from "./components/Album/MainAlbum";
import Reviews from "./components/CustomerRevs/CustomerReviews";
import Footer from "./components/Footer/Footer";

const Home = () => {
  const guest = document.querySelector(".guest");
  const guestSection= document.getElementById("guestSection")
  const organizer=document.getElementById(".organizer");
  const organizerSection=document.getElementById("organizers");
  const guest_func=()=>{
    guest.classList.add("active");
    organizer.style.display="none"
    organizerSection.style.display="none";
    guestSection.style.display="block";
   
  }

  const organizer_func=()=>{
  
    guest.classList.remove("active")
    organizer.classList.add("active")
    guestSection.style.display="none"
    organizerSection.style.display="block";
    
  }
  return (
    <div className="home">
      <div className="main_body">
        <Header />
        <div className="slang">
          Make it memorable “Yes”!
          <div>
            RSVP with Ease Using <span className="slogan">WILL.BE.THERE</span>
          </div>
        </div>

        <div className="paragraph">
          Event planning can be a whirlwind, but RSVPs can be a breeze.{" "}
          <span className="slogan white">WILL.BE.THERE</span> makes managing
          guest responses effortless, so you can focus on creating a memorable
          event.
        </div>

        <div className="buttonWrapper">
          <Link to={"/more"}>
            <HomePageButton className="more">Learn More</HomePageButton>
          </Link>

          <Link to={"/events"}>
            <HomePageButton className="create-d">
              Create Event Your Events Now
            </HomePageButton>
            <HomePageButton className="create-m">
              Create Event
            </HomePageButton>
          </Link>
        </div>
      </div>

      <div className="switchSection">
        <div className="toper">
          <img src={topBanner} alt="Banner" />
        </div>

        <div id="switchTab">
          <div className="organizer active" onClick={organizer_func} id="organizer">Organizer</div>

          <div className="guest" onClick={guest_func}>Guest</div>
        </div>

        <div className="organizerSection" id="organizers">
          <div className="heading">Create Your Perfect Event Effortlessly</div>
          <div className="details">
            Our event creation feature empowers you to design and customize your
            ideal event with ease and precision. <span>WILL.BE.THERE</span> puts
            you in control, allowing you to tailor every aspect to your unique
            vision.
          </div>

          <div className="organizerFormLayout">
            <div className="blobLeft top"></div>

            <div className="form">
              <img src={formPicture} alt="A glass and roses on a table" />
              <EventForm />
            </div>

            <div className="blobRight bottom"></div>
          </div>
        </div>

        <div className="guestSection" id="guestSection">
          <div className="heading">Update Your Availability On-the-Go</div>
          <div className="details">
          Never miss a beat!  Our easy-to-use RSVP system lets you update your availability for the event anytime, anywhere.
          </div>

          <div className="organizerFormLayout">
            <div className="blobLeft top"></div>

            <div className="guests_ads">
<img src={GuestsSect} alt="Guests section" />
            </div>

            <div className="blobRight bottom"></div>
          </div>
        </div>  
      </div>

      <Card />

      <div className="brandsTrusts">
        <p>Trusted by Leading Brands</p>

        <img src={Brands} alt="Brands" />
      </div>

<MainAlbum/>

<Reviews/>


<Footer/>
    </div>
  );
};

export default Home;
