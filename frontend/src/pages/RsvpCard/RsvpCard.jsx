import { useGetEvent } from "../../hooks/events";
import Loader from "../../ui/Loader/Loader";
import "./rsvp-card.scss";
import { NavLink } from "react-router-dom";

const RsvpCard = ({ rsvp }) => {
  const { event } = rsvp;
  return (
    <NavLink to={`?event=${event.id}&rsvp=${rsvp.id}`} className="event-card">
      <div className="image-container">
        <img src={event.media?.[0]?.imageUrl} />
      </div>
      <div className="text-container">
        <span className="text">{event.name}</span>
      </div>
    </NavLink>
  );
};

export default RsvpCard;
