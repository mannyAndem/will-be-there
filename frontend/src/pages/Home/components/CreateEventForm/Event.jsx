import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "./eventstyle.scss";
import fileIcon from "../../../../assets/images/document-upload.png"
import locationIcon from "../../../../assets/images/Vector.png"

const EventForm = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    date: Yup.date().required('Date is required'),
    time: Yup.string().required('Time is required'),
    file: Yup.mixed().required('File is required'),
    location: Yup.string().required('Location is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      date: '',
      time: '',
      file: null,
      location: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
    },
  });

  return (
<div className="formBody">
    {/* <FormImage/> */}
    <form onSubmit={formik.handleSubmit} className='formEvent'>
      <div className="eventForm">
        <label htmlFor="name">Event name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          placeholder='Name of the Event'
          disabled
        />
        {formik.touched.name && formik.errors.name ? (
          <div className='errorClass'>{formik.errors.name}</div>
        ) : null}
      </div>

      <div className="eventForm">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          name="date"
          type="date"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.date}
          disabled
        />
        {formik.touched.date && formik.errors.date ? (
          <div className='errorClass'>{formik.errors.date}</div>
        ) : null}
      </div>

      <div className="eventForm">
        <label htmlFor="time">Time Start</label>
        <input
          id="start_time"
          name="start_time"
          type="time"
          placeholder='Time Start'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.time}
          disabled
        />
        {formik.touched.start_time && formik.errors.start_time ? (
          <div className='errorClass'>{formik.errors.start_time}</div>
        ) : null}
      </div>

      <div className="eventForm">
        
        <label htmlFor="time">Time End</label>
        <input
          id="stop_time"
          name="stop_time"
          type="time"
          placeholder='Time End'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.stop_time}
          disabled
        />
        {formik.touched.stop_time && formik.errors.stop_time ? (
          <div className='errorClass'>{formik.errors.stop_time}</div>
        ) : null}
      </div>
      <div className="eventForm file">
        <label htmlFor="file">Upload Image or <br />video <img src={fileIcon} alt="File Icon" /></label>
        <input
          id="file"
          name="file"
          type="file"
          disabled
          onChange={(event) => {
            formik.setFieldValue('file', event.currentTarget.files[0]);
          }}
          
        />
        {formik.touched.file && formik.errors.file ? (
          <div className='errorClass'>{formik.errors.file}</div>
        ) : null}
      </div>

      <div className="eventForm location">
        <label htmlFor="location">Include the event <br />location <img src={locationIcon} alt="" /></label>
        <input
          id="location"
          name="location"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.location}
// Add Google Maps API here...

        />
        {formik.touched.location && formik.errors.location ? (
          <div className='errorClass'>{formik.errors.location}</div>
        ) : null}
      </div>


    </form>
</div>
    
  );
};

export default EventForm;