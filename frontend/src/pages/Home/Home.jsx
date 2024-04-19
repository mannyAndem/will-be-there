import { useEffect, useState } from "react";
import "./home.scss";
import { useAuthContext } from "../../contexts/AuthContext";
import { useGetCurrentUser } from "../../hooks/auth";
import Header from "../../ui/Header/Header";
import { Link } from "react-router-dom";
import HomePageButton from "../../ui/HomepageButton/HomepageButton";
import topBanner from "../../assets/images/banner.png"
import EventForm from "./components/CreateEventForm/Event";
import formPicture from "../../assets/images/form-picture.png";
import Card from "./components/ComponentCard/MainComponent";
import Brands from "../../assets/images/brands.png"

const Home = () => {
  const { user } = useAuthContext();
  const { data, isPending, isError, isSuccess } = useGetCurrentUser();

  return <div className="home">
    <div className="main_body">

    <div className="header_class">
      <Link to={"/"} className="slogan">WILL.BE.THERE</Link>

      <Header />
    </div>
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

    <div className="switchSection">
      <div className="toper">
     <img src={topBanner} alt="Banner" />
      </div>

      <div id="switchTab">
        <div className="organizer active ">
          Organizer
        </div>

        <div className="guest">Guest</div>
      </div>

      <div className="organizerSection">
        <div className="heading">
        Create Your Perfect Event
Effortlessly
        </div>
        <div className="details">
        Our event creation feature empowers you to design and customize your ideal event with ease and precision. <span>WILL.BE.THERE</span> puts you in control, allowing you to tailor every aspect to your unique vision.
        </div>

        <div className="organizerFormLayout">
          <div className="blobLeft top">

          </div>


          <div className="form">

            <img src={formPicture} alt="A glass and roses on a table" />
            <EventForm/>
          </div>

          <div className="blobRight bottom">

          </div>


        </div>
      </div>
    </div>

<Card/>

<div className="brandsTrusts">
  <p>Trusted by Leading Brands</p>

  <img src={Brands} alt="Brands" />
</div>

  </div>;
};

export default Home;
