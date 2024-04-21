import Button from "../../../../ui/Button/Button";
import "./template-card.scss";
import { LuPenLine } from "react-icons/lu";

const TemplateCard = ({ img }) => {
  return (
    <div className="template-card" style={{ backgroundImage: `url(${img})` }}>
      <div>
        <div>
          <Button size="sm">
            <div className="flex-container">
              <span>Edit event details</span>
              <LuPenLine size={20} className="icon" />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
