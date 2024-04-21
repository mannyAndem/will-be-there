import "./text-area.scss";

const TextArea = ({ placeholder, value, name, id, onChange }) => {
  return (
    <textarea
      className="text-area"
      placeholder={placeholder}
      value={value}
      name={name}
      id={id ? id : name}
      onChange={onChange}
    ></textarea>
  );
};

export default TextArea;
