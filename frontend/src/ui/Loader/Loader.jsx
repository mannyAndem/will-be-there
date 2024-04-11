import { ClipLoader } from "react-spinners";
import "./loader.scss";

const Loader = () => {
  return (
    <div className="loader">
      <ClipLoader color="#f8f9fd" size={20} />
    </div>
  );
};

export default Loader;
