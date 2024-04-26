import { useCreateEvent } from "../../../../hooks/events";
import { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Formik } from "formik";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";
import * as yup from "yup";
import Button from "../../../../ui/Button/Button";
import InputGroup from "../../../../ui/InputGroup/InputGroup";
import "./create-event-form.scss";

const CreateEventForm = () => {
  const { create, isPending, isError, isSuccess } = useCreateEvent();
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

  const handleSubmit = (values) => {
    const data = { ...values };

    const date = new Date(
      +data.date.split("/")[2],
      +data.date.split("/")[1] - 1,
      +data.date.split("/")[0]
    );

    const startTime = new Date(
      +data.date.split("/")[2],
      +data.date.split("/")[1] - 1,
      +data.date.split("/")[0],
      +data.start.split(":")[0],
      +data.start.split(":")[1]
    );

    const endTime = new Date(
      +data.date.split("/")[2],
      +data.date.split("/")[1] - 1,
      +data.date.split("/")[0],
      +data.end.split(":")[0],
      +data.end.split(":")[1]
    );

    data.start = startTime.toISOString();
    data.end = endTime.toISOString();
    data.date = date.toISOString();

    create(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Event created successfully");
    }
    if (isError) {
      toast.error("Couldn't create your event");
    }
  }, [isSuccess, isError]);

  return (
    <>
      <Toaster containerStyle={{ fontFamily: "Montserrat" }} />
      <Formik
        initialValues={initialValues}
        validationSchema={formSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleChange,
          errors,
          touched,
          setFieldValue,
          isValid,
          dirty,
          handleSubmit,
        }) => (
          <form className="create-event-form" onSubmit={handleSubmit}>
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
                placeholder="DD/MM/YYYY"first
                value={values.date}
                onChange={(e) => setFieldValue(e.target.)}
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
                  <InputGroup.Label style={{ opacity: 0 }}>
                    Time
                  </InputGroup.Label>
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
                <Button disabled={!isValid || !dirty} pending={isPending}>
                  Save Event Details
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default CreateEventForm;
