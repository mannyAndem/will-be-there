import Header from "../../ui/Header/Header";
import "./rsvp.scss";
import { LuPenLine } from "react-icons/lu";
import Button from "../../ui/Button/Button";
import mockEventImg from "../../assets/images/event-image.png";
import EventCard from "./components/EventCard/EventCard";
import Banner from "./components/Banner/Banner";
import RsvpForm from "./components/RsvpForm/RsvpForm";

const Events = () => {
  return (
    <div className="rsvp-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="previous-events-header">
        <h2>Previous Events</h2>
      </div>
      <div className="events-list">
        <EventCard img={mockEventImg} title="Halimahs Lunch Date" />
      </div>
      <section className="rsvp-form-section">
        <Banner img={mockEventImg} />
        <div className="rsvp-form-container">
          <RsvpForm />
        </div>
      </section>
    </div>
  );
};

export default Events;
