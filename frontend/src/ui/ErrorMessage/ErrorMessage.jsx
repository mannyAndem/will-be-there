import "./error-message.scss";

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message-container">
      <span className="error-message">{message}</span>;
    </div>
  );
};

export default ErrorMessage;
