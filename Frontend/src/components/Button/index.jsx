import "./style.css";

const Button = ({ onClick, className, children }) => {
  return (
    <button onClick={onClick} className={`custom-btn ${className}`}>
      {children}
    </button>
  );
};

export default Button;
