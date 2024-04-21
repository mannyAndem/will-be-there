import Button from "../../../ui/Button/Button";

const Tab = ({ title, active }) => {
  return (
    <Button variant={active ? "primary" : "secondary"} size="sm">
      {title}
    </Button>
  );
};

export default Tab;
