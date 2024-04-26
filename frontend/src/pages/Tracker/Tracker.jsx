import React from "react";
import Header from "../../ui/Header/Header";
import { LuPenLine } from "react-icons/lu";
import Button from "../../ui/Button/Button";
import mockEventImg1 from "../../assets/images/event-image.png";
import mockEventImg2 from "../../assets/images/TedX.png"
import mockEventImg3 from "../../assets/images/David.png"
import mockEventImg4 from "../../assets/images/Kunle.png"

import EventCard from "../RSVP/components/EventCard/EventCard";
import "./tracker.scss";
import "../RSVP/rsvp.scss";
import GuestLists from "./component/Guest";




const Tracker = () => {
    return ( 
        <div className="tracker-container">
          <Header/>

          <div className="previous-events-header">
        <h2>Event List</h2>
      </div>

      <div className="events-list">
      <EventCard img={mockEventImg1} title="Halimah's Lunch Date"/>

      <EventCard img={mockEventImg2} title="Ted X Conference"/>
      <EventCard img={mockEventImg3} title="David's 30th Birthday"/>
      <EventCard img={mockEventImg4} title="Kunle Afolayan's Wedding"/>
      </div>

      <div className="previous-events-header">
        <h2>Guest List for Kunle Afolayans Wedding</h2>
      </div>

    

      <GuestLists />
        </div>
     );
}
 
export default Tracker;