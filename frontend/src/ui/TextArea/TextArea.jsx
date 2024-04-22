import { useField } from "formik";
import "./text-area.scss";

const TextArea = ({ placeholder, value, name, id, onChange, error }) => {
  const [field, meta, helpers] = useField({ name, onChange, value });

  return (
    <textarea
      {...field}
      className="text-area"
      placeholder={placeholder}
      value={value}
      name={name}
      id={id ? id : name}
      onChange={onChange}
      aria-invalid={!!error}
    ></textarea>
  );
};

export default TextArea;
