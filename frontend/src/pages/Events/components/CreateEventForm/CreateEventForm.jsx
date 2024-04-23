import { Formik } from "formik";
import InputGroup from "../../../../ui/InputGroup/InputGroup";
import "./create-event-form.scss";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";
import Button from "../../../../ui/Button/Button";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateEventForm = () => {
  const initialValues = {
    name: "",
    date: "",
    start: "",
    end: "",
    location: "",
    media: [],
  };

  const formSchema = yup.object().shape({
    name: yup.string().required("Event name is required"),
    date: yup
      .string()
      .matches(
        /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
        "Invalid date"
      ),
    start: yup.string().required("Start time is required"),
    end: yup.string().required("End time is required"),
    location: yup.string().required("Location is required"),
    media: yup
      .array()
      .of(yup.mixed())
      .min(1, "You must add atleast one event image"),
  });

  // TIME ZONE STUFF:

  return (
    <Formik initialValues={initialValues} validationSchema={formSchema}>
      {({ values, handleChange, errors, touched, setFieldValue }) => (
        <form className="create-event-form">
          {console.log(values)}
          <div>
            <InputGroup name="name" error={touched.name && errors.name}>
              <InputGroup.Label>Event Name</InputGroup.Label>
              <InputGroup.Input
                placeholder="Enter the event name"
                value={values.name}
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup name="date" error={touched.date && errors.date}>
              <InputGroup.Label>Date</InputGroup.Label>
              {/* <InputGroup.Input
                placeholder="DD/MM/YYYY"
                value={values.date}
                onChange={handleChange}
                type="date"
              /> */}
              <InputGroup.Input
                placeholder="DD/MM/YYYY"
                value={values.date}
                onChange={handleChange}
              />
            </InputGroup>
            <div className="time-container">
              <InputGroup name="start" error={touched.start && errors.start}>
                <InputGroup.Label>Time</InputGroup.Label>
                <InputGroup.Input
                  placeholder="Start time"
                  value={values.start}
                  onChange={handleChange}
                  type="time"
                />
              </InputGroup>
              <InputGroup name="end" error={touched.end && errors.end}>
                <InputGroup.Label style={{ opacity: 0 }}>Time</InputGroup.Label>
                <InputGroup.Input
                  placeholder="End time"
                  value={values.end}
                  onChange={handleChange}
                  type="time"
                />
              </InputGroup>
            </div>
            <div className="location-container">
              <InputGroup
                name="location"
                error={touched.location && errors.location}
              >
                <InputGroup.Label>Location</InputGroup.Label>
                <InputGroup.TextArea
                  placeholder="Location of the event"
                  value={values.location}
                  onChange={handleChange}
                />
              </InputGroup>
            </div>
            {/* Change this to the correct name later!!!!! */}
            <InputGroup name="media">
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
                value={values.media}
                onChange={(e) =>
                  setFieldValue("media", Array.from(e.target.files), true)
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
