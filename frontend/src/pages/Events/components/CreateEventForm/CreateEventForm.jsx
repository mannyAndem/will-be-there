import { Formik } from "formik";
import InputGroup from "../../../../ui/InputGroup/InputGroup";
import "./create-event-form.scss";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";
import Button from "../../../../ui/Button/Button";

const CreateEventForm = () => {
  return (
    <Formik>
      {() => (
        <form className="create-event-form">
          <div>
            <InputGroup>
              <InputGroup.Label>Event Name</InputGroup.Label>
              <InputGroup.Input placeholder="Enter the event name" />
            </InputGroup>
            <InputGroup>
              <InputGroup.Label>Date</InputGroup.Label>
              <InputGroup.Input placeholder="DD/MM/YYYY" />
            </InputGroup>
            <div className="time-container">
              <InputGroup>
                <InputGroup.Label>Time</InputGroup.Label>
                <InputGroup.Input placeholder="Start time" />
              </InputGroup>
              <InputGroup>
                <InputGroup.Label style={{ opacity: 0 }}>Time</InputGroup.Label>
                <InputGroup.Input placeholder="End time" />
              </InputGroup>
            </div>
            <div className="location-container">
              <InputGroup>
                <InputGroup.Label>Location</InputGroup.Label>
                <InputGroup.TextArea placeholder="Location of the event" />
              </InputGroup>
            </div>
            <InputGroup>
              <InputGroup.Label>Image</InputGroup.Label>
              <InputGroup.Input
                placeholder={
                  <div className="image-input-placeholder">
                    <span>Click here to upload Image or Video</span>
                    <HiOutlineDocumentArrowUp
                      size={24}
                      className="document-icon"
                    />
                  </div>
                }
                type="file"
              />
            </InputGroup>
          </div>
          <div className="button-container">
            <div>
              <Button>Save Event Details</Button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default CreateEventForm;
