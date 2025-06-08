import Input from "../Input";

const FormData = ({
  element = "input",
  name,
  placeholder,
  type,
  className,
  onChange,
  error,
  value,
}) => {
  let component = <></>;

  if (element == "input") {
    component = (
      <Input
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className={className}
        type={type}
        value={value}
      />
    );
  }
  return (
    <div className="form-data">
      {component}
      {error}
    </div>
  );
};

export default FormData;
