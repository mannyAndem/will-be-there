import Loader from "../Loader/Loader";
import "./button.scss";

const Button = ({
  children,
  pending,
  disabled,
  onClick,
  size = "md",
  variant = "primary",
}) => {
  return (
    <button
      className={
        "button " +
        (size == "sm" ? "button-sm" : "button-md") +
        (variant === "secondary" ? " secondary" : " primary")
      }
      onClick={onClick}
      disabled={disabled}
    >
      {pending && <Loader />}
      <div className={pending ? "pending" : ""}>{children}</div>
    </button>
  );
};

export default Button;
