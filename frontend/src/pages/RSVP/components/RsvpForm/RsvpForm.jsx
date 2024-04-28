import "./rsvp-form.scss";
import InputGroup from "../../../../ui/InputGroup/InputGroup";
import { Formik } from "formik";
import Button from "../../../../ui/Button/Button";
import * as yup from "yup";
import Select from "../../../../ui/Select/Select";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

const RsvpForm = ({ event }) => {
  const initialValues = {
    name: "",
    email: "",
    notes: "",
    registry: "",
    guestNames: [],
    guestNumber: 0,
  };

  const formSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    notes: yup.string().notRequired(),
    registry: yup.string().notRequired(),
    guestNames: yup.array().of(yup.string()).notRequired(),
    guestNumber: yup.number(),
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        dirty,
        isValid,
        errors,
        setFieldValue,
      }) => (
        <form className="create-event-form" onSubmit={handleSubmit}>
          {console.log(values)}
          <div>
            <InputGroup name="name" error={errors.name}>
              <InputGroup.Label>Full name</InputGroup.Label>
              <InputGroup.Input
                placeholder="Enter your full name"
                value={values.name}
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup name="email" error={errors.email}>
              <InputGroup.Label>Email</InputGroup.Label>
              <InputGroup.Input
                placeholder="Enter your email"
                value={values.email}
                onChange={handleChange}
              />
            </InputGroup>
            <div className="guest-info-container">
              <InputGroup>
                <InputGroup.Label>Guest Info</InputGroup.Label>
                <InputGroup.Input
                  placeholder="Number of additional guests"
                  type="number"
                  readOnly
                  value={values.guestNumber}
                />
              </InputGroup>
              <InputGroup name="guestNames" error={errors.guestNames}>
                <InputGroup.Label style={{ opacity: 0 }}>Time</InputGroup.Label>
                <div className="guest-input-container">
                  <InputGroup.Input
                    placeholder="Names of additional guests"
                    value={values.guestNames.join(",")}
                    onChange={(e) => {
                      setFieldValue("guestNames", e.target.value.split(","));
                      setFieldValue("guestNumber", values.guestNames.length);
                    }}
                  />
                  <div className="info">
                    <HiOutlineExclamationCircle size={12} className="icon" />
                    <span>Separate the names with commas</span>
                  </div>
                </div>
              </InputGroup>
            </div>
            <div className="note-container">
              <InputGroup name="notes">
                <InputGroup.Label>Note</InputGroup.Label>
                <InputGroup.TextArea
                  placeholder="Add congratulatory message or make a comment"
                  value={values.notes}
                  onChange={handleChange}
                />
              </InputGroup>
            </div>
            <InputGroup name="registry">
              <InputGroup.Label>Registry</InputGroup.Label>
              <Select
                onChange={(e) => setFieldValue("registry", e.target.value)}
              >
                {event.expectedGifts.map((gift) => (
                  <option value={gift}>{gift}</option>
                ))}
              </Select>
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
