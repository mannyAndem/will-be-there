import "./rsvp-form.scss";
import InputGroup from "../../../../ui/InputGroup/InputGroup";
import { Formik } from "formik";
import Button from "../../../../ui/Button/Button";

const RsvpForm = () => {
  const initialValues = {};

  return (
    <Formik>
      {() => (
        <form className="create-event-form">
          <div>
            <InputGroup>
              <InputGroup.Label>Full name</InputGroup.Label>
              <InputGroup.Input placeholder="Enter your full name" />
            </InputGroup>
            <InputGroup>
              <InputGroup.Label>Email</InputGroup.Label>
              <InputGroup.Input placeholder="Enter your email" />
            </InputGroup>
            <div className="guest-info-container">
              <InputGroup>
                <InputGroup.Label>Guest Info</InputGroup.Label>
                <InputGroup.Input
                  placeholder="Number of additional guests"
                  type="number"
                />
              </InputGroup>
              <InputGroup>
                <InputGroup.Label style={{ opacity: 0 }}>Time</InputGroup.Label>
                <InputGroup.Input placeholder="Names of additional guests" />
              </InputGroup>
            </div>
            <div className="note-container">
              <InputGroup>
                <InputGroup.Label>Note</InputGroup.Label>
                <InputGroup.TextArea placeholder="Add congratulatory message or make a comment" />
              </InputGroup>
            </div>
            <InputGroup>
              <InputGroup.Label>Registry</InputGroup.Label>
              <InputGroup.Input placeholder="Empty the wishlist" />
            </InputGroup>
          </div>
          <div className="button-container">
            <div>
              <Button>Reserve Invite</Button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default RsvpForm;
