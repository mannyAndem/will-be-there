import { GoPlus } from "react-icons/go";
import "./create-template-button.scss";

const CreateTemplateButton = () => {
  return (
    <button className="create-template-button">
      <GoPlus size={50} className="plus-icon" />
      <span>Create Template</span>
    </button>
  );
};

export default CreateTemplateButton;
