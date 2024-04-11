import Loader from "../Loader/Loader";
import "./button.scss";

const Button = ({ children, pending, disabled }) => {
  return (
    <button disabled={disabled}>
      {pending && <Loader />}
      <div className={pending ? "pending" : ""}>{children}</div>
    </button>
  );
};

export default Button;
