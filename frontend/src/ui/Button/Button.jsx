import Loader from "../Loader/Loader";
import "./button.scss";

const Button = ({ children, pending, disabled, size = "md" }) => {
  return (
    <button
      className={"button " + (size == "sm" ? "button-sm" : "button-md")}
      disabled={disabled}
    >
      {pending && <Loader />}
      <div className={pending ? "pending" : ""}>{children}</div>
    </button>
  );
};

export default Button;
