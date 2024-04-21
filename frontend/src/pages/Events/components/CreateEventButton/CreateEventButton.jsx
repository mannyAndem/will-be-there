import { GoPlus } from "react-icons/go";
import "./create-event-button.scss";

const CreateEventButton = () => {
  return (
    <button className="create-event-button">
      <GoPlus size={40} className="plus-icon" />
      <span>Create Event</span>
    </button>
  );
};

export default CreateEventButton;
