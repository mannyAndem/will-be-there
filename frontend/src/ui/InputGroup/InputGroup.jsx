import { createContext, useContext } from "react";
import "./inputGroup.scss";
import Input from "../Input/Input";

const InputGroupContext = createContext(null);

const useInputGroupContext = () => {
  return useContext(InputGroupContext);
};

const InputGroup = ({ children, id, name }) => {
  return (
    <div className="input-group">
      <InputGroupContext.Provider value={{ id, name }}>
        {children}
      </InputGroupContext.Provider>
    </div>
  );
};

export default InputGroup;

InputGroup.Label = ({ children }) => {
  const context = useInputGroupContext();

  if (!context) {
    throw new Error("InputGroup.Label must have a parent InputGroup.");
  }

  const { id, name } = context;

  return <label htmlFor={id ? id : name}>{children}</label>;
};

InputGroup.Input = ({ value, onChange, placeholder, ...rest }) => {
  const context = useInputGroupContext();

  if (!context) {
    throw new Error("InputGroup.Input must have a parent InputGroup.");
  }

  const { id, name } = context;
  return (
    <Input
      id={id ? id : name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...rest}
    />
  );
};
