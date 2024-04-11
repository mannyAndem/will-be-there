import { Field } from "formik";
import "./input.scss";

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
      autocomplete="off"
      {...rest}
    />
  );
};

export default Input;
