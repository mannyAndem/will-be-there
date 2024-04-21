import "./event-card.scss";

const EventCard = ({ img, title }) => {
  return (
    <div className="event-card">
      <div className="image-container">
        <img src={img} />
      </div>
      <div className="text-container">
        <span className="text">{title}</span>
      </div>
    </div>
  );
};

export default EventCard;
