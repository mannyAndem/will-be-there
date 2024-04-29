import { useCreateEvent, usePatchEvent } from "../../../../hooks/events";
import { useEffect, useRef, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Formik } from "formik";
import { HiOutlineDocumentArrowUp, HiPlus } from "react-icons/hi2";
import * as yup from "yup";
import Button from "../../../../ui/Button/Button";
import InputGroup from "../../../../ui/InputGroup/InputGroup";
import "./create-event-form.scss";
import { HiXCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const CreateEventForm = ({ event }) => {
  const {
    create,
    isPending: isCreatePending,
    isError: isCreateError,
    isSuccess: isCreateSuccess,
    error: createError,
    data,
  } = useCreateEvent();
  const {
    patch,
    isPending: isPatchPending,
    isError: isPatchError,
    isSuccess: isPatchSuccess,
    error: patchError,
  } = usePatchEvent();
  const navigate = useNavigate();

  console.log(event);

  const initialValues = {
    name: event?.name ?? "",
    date: event?.date.split("T")[0].split("-").reverse().join("/") ?? "",
    start: event?.start.split("T")[1].split(":").splice(0, 2).join(":") ?? "",
    end: event?.end.split("T")[1].split(":").splice(0, 2).join(":") ?? "",
    location: event?.location ?? "",
    media: event?.media ?? [],
    expectedGifts: event ? [...event.expectedGifts] : [],
  };

  const [giftValue, setGiftValue] = useState("");

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
    expectedGifts: yup.array().of(yup.string()).notRequired(),
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

    if (event) {
      patch({ values: data, eventId: event.id });
    } else {
      create(data);
    }
  };

  useEffect(() => {
    if (isCreateSuccess) {
      toast.success("Event created successfully");
      setTimeout(() => {
        navigate(`/tracker?event=${data.id}`);
      }, 1000);
    }
    if (isCreateError) {
      toast.error(error.response?.data?.message ?? "Something went wrong");
    }
  }, [isCreateSuccess, isCreateError]);

  useEffect(() => {
    if (isPatchSuccess) {
      toast.success("Event updated successfully");
    }
    if (isPatchError) {
      toast.error(patchError.response?.data?.message ?? "Something went wrong");
      console.error(patchError);
    }
  }, [isPatchSuccess, isPatchError]);

  return (
    <>
      <Toaster containerStyle={{ fontFamily: "Montserrat" }} />
      <Formik
        initialValues={initialValues}
        validationSchema={formSchema}
        onSubmit={handleSubmit}
        enableReinitialize
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
            <div>
              <h3 className="gift-header">Gift Items (Optional)</h3>

              <InputGroup name="gifts">
                <InputGroup.Label>Gifts</InputGroup.Label>
                <div className="add-gift-container">
                  <InputGroup.Input
                    placeholder="Include gifts"
                    value={giftValue}
                    onChange={(e) => setGiftValue(e.target.value)}
                  />
                  <button
                    className="add-gift-button"
                    type="button"
                    onClick={() => {
                      if (giftValue) {
                        setFieldValue("expectedGifts", [
                          ...values.expectedGifts,
                          giftValue,
                        ]);
                        setGiftValue("");
                      }
                    }}
                  >
                    <HiPlus size={24} />
                  </button>
                </div>
                <div className="gifts-list">
                  {values.expectedGifts.map((gift, index) => (
                    <div className="gift" key={index}>
                      <span>{gift}</span>
                      <HiXCircle
                        size={16}
                        className="x-icon"
                        onClick={() => {
                          setFieldValue(
                            "expectedGifts",
                            values.expectedGifts.filter((_, i) =>
                              i == index ? false : true
                            )
                          );
                        }}
                      />
                    </div>
                  ))}
                </div>
              </InputGroup>
            </div>
            <div className="button-container">
              {event ? (
                <div>
                  <Button
                    disabled={!isValid || !dirty}
                    pending={isPatchPending}
                  >
                    Save Edit
                  </Button>
                </div>
              ) : (
                <div>
                  <Button
                    disabled={!isValid || !dirty}
                    pending={isCreatePending}
                  >
                    Save Event Details
                  </Button>
                </div>
              )}
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default CreateEventForm;
