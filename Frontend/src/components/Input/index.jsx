import "./style.css";

const Input = ({ type, name, placeholder, className, onChange, value }) => {
  return (
    <input
      name={name}
      type={type}
      className={`custom-input ${className}`}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};

export default Input;
