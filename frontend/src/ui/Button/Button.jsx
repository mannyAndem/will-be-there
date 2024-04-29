import Loader from "../Loader/Loader";
import "./button.scss";

const Button = ({
  children,
  pending,
  disabled,
  onClick,
  type,
  size = "md",
  variant = "primary",
}) => {
  return (
    <button
      type={type}
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
