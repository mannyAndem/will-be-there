import { Field } from "formik";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import DatePicker from "react-datepicker";
import "./input.scss";
import "react-datepicker/dist/react-datepicker.css";

const Input = ({
  name,
  type,
  value,
  placeholder,
  id,
  onChange,
  error,
  ...rest
}) => {
  if (type === "file") {
    return (
      <div className="file-input-container">
        <input
          className="file-input"
          id={id ? id : name}
          onChange={onChange}
          name={name}
          // value={value}
          type="file"
          placeholder={placeholder}
          aria-invalid={!!error}
          multiple
          {...rest}
        />
        <label className="file-input-label" htmlFor={id ? id : name}>
          {placeholder}
        </label>
        <div className="info">
          {value.length > 0 ? (
            // value.map((file) => <div>{file.name}</div>)
            <div>
              {value.length} {value.length === 1 ? "file" : "files"} uploaded
            </div>
          ) : (
            <>
              <HiOutlineExclamationCircle size={12} className="icon" />
              <span>JPG, PNG, PDF and SVG files only</span>
            </>
          )}
        </div>
      </div>
    );
  }

  if (type === "date") {
    return (
      <DatePicker
        className="input"
        id={id ? id : name}
        onChange={onChange}
        name={name}
        value={value}
        placeholder={placeholder}
        aria-invalid={!!error}
        {...rest}
      />
    );
  }

  return (
    <Field
      className="input"
      id={id ? id : name}
      onChange={onChange}
      name={name}
      value={value}
      type={type ? type : "text"}
      placeholder={placeholder}
      aria-invalid={!!error}
      autoComplete="off"
      {...rest}
    />
  );
};

export default Input;
