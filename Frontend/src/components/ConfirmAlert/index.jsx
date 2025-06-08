import "./style.css";
import Button from "../Button";

const Confirm = ({ Confirm, Cancel }) => {
  return (
    <div className="confirm">
      <h3>Are your sure?</h3>
      <div className="confirm-btns">
        <Button onClick={Confirm} children={"Confirm"}></Button>
        <Button onClick={Cancel} children={"Cancel"}></Button>
      </div>
    </div>
  );
};

export default Confirm;
