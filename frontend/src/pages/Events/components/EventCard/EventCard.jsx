import { NavLink } from "react-router-dom";
import "./event-card.scss";

const EventCard = ({ event }) => {
  return (
    <NavLink to={`/events?id=${event.id}`} className="event-card">
      <div className="image-container">
        <img src={event.media[0]?.imageUrl} />
      </div>
      <div className="text-container">
        <span className="text">{event.name}</span>
      </div>
    </NavLink>
  );
};

export default EventCard;
