import "./rsvp-form.scss";
import InputGroup from "../../../../ui/InputGroup/InputGroup";
import { Formik } from "formik";
import Button from "../../../../ui/Button/Button";
import * as yup from "yup";
import Select from "../../../../ui/Select/Select";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { useCreateRsvp } from "../../../../hooks/events";
import { Toaster, toast } from "react-hot-toast";
import { useEffect } from "react";
const RsvpForm = ({ event }) => {
  const { create, isPending, isError, isSuccess, error, data } =
    useCreateRsvp();

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

    const { guestNumber, ...data } = values;
    data.registry = [data.registry]; // This is a weird quirk because the server expects an array. This should be fixed.

    create({ eventId: event.id, data });
  };

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      toast.success(`You have successfully rsvp'd for ${event.name}`);
    }
    if (isError) {
      console.error(error);
      toast.error(error.response?.data?.message ?? "Something went wrong");
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
                  <InputGroup.Label style={{ opacity: 0 }}>
                    Time
                  </InputGroup.Label>
                  <div className="guest-input-container">
                    <InputGroup.Input
                      placeholder="Names of additional guests"
                      value={values.guestNames.join(",")}
                      onChange={(e) => {
                        if (e.target.value) {
                          const guests = e.target.value.split(",");
                          setFieldValue("guestNames", guests);
                          setFieldValue("guestNumber", guests.length);
                        } else {
                          const guests = [];
                          setFieldValue("guestNames", guests);
                          setFieldValue("guestNumber", guests.length);
                        }
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
                <Select name="registry" onChange={handleChange}>
                  <option value="">Choose gift</option>
                  {event.expectedGifts.map((gift) => (
                    <option value={gift}>{gift}</option>
                  ))}
                </Select>
              </InputGroup>
            </div>
            <div className="button-container">
              <div>
                <Button pending={isPending} disabled={!isValid || !dirty}>
                  Reserve Invite
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default RsvpForm;
