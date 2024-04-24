import "./error-message.scss";

const ErrorMessage = ({ message }) => {
  return <span className="error-message">{message}</span>;
};

export default ErrorMessage;
