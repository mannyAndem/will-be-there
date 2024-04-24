import Button from "../../../../ui/Button/Button";
import { MdCall } from "react-icons/md";
import "./banner.scss";

const Banner = ({ img }) => {
  return (
    <div style={{ backgroundImage: `url(${img})` }} className="banner">
      <div className="content-container">
        <div>
          <Button size="sm">
            <div className="button-content-container">
              <span>Contact the Organizer</span>
              <MdCall size={20} className="call-icon" />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
