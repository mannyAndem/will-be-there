import { createContext, useContext } from "react";
import "./inputGroup.scss";
import Input from "../Input/Input";
import TextArea from "../TextArea/TextArea";

const InputGroupContext = createContext(null);

const useInputGroupContext = () => {
  return useContext(InputGroupContext);
};

const InputGroup = ({ children, id, name, error }) => {
  return (
    <div className="input-group">
      <InputGroupContext.Provider value={{ id, name, error }}>
        {children}
        {error && <span className="error">{error}</span>}
      </InputGroupContext.Provider>
    </div>
  );
};

export default InputGroup;

InputGroup.Label = ({ children, style }) => {
  const context = useInputGroupContext();

  if (!context) {
    throw new Error("InputGroup.Label must have a parent InputGroup.");
  }

  const { id, name } = context;

  return (
    <label style={style} htmlFor={id ? id : name}>
      {children}
    </label>
  );
};

InputGroup.Input = ({ type, value, onChange, placeholder, ...rest }) => {
  const context = useInputGroupContext();

  if (!context) {
    throw new Error("InputGroup.Input must have a parent InputGroup.");
  }

  const { id, name, error } = context;
  return (
    <Input
      type={type}
      error={error}
      id={id ? id : name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...rest}
    />
  );
};

InputGroup.TextArea = ({ value, onChange, placeholder, ...rest }) => {
  const context = useInputGroupContext();

  if (!context) {
    throw new Error("InputGroup.TextArea must have a parent InputGroup.");
  }

  const { id, name, error } = context;
  return (
    <TextArea
      error={error}
      id={id ? id : name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...rest}
    />
  );
};
