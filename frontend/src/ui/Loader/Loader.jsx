import { ClipLoader } from "react-spinners";
import "./loader.scss";

const Loader = ({ variant = "light", size = "sm" }) => {
  return (
    <div className="loader">
      <ClipLoader
        color={variant === "light" ? "#f8f9fd" : "#23c55e"}
        size={size === "sm" ? 20 : "124"}
      />
    </div>
  );
};

export default Loader;
