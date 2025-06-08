import "./style.css";

const NavBar = ({ heading, className }) => {
  return (
    <div className={`custom-nav ${className}`}>
      <h4> {heading}</h4>
    </div>
  );
};

export default NavBar;
