import { GoPlus } from "react-icons/go";
import "./create-event-button.scss";
import { Link } from "react-router-dom";

const CreateEventButton = () => {
  return (
    <Link to="/events" className="create-event-button">
      <GoPlus size={40} className="plus-icon" />
      <span>Create Event</span>
    </Link>
  );
};

export default CreateEventButton;
