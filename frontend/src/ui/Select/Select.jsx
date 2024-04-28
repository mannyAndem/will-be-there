import "./select.scss";
import arrowDown from "../../assets/images/arrow-down.png";

const Select = ({ children, name, value, onChange, id, ...rest }) => {
  return (
    <select
      className="select"
      name={name}
      id={id ?? name}
      value={value}
      onChange={onChange}
      style={{
        backgroundImage: `url(${arrowDown})`,
      }}
    >
      {children}
    </select>
  );
};

export default Select;
