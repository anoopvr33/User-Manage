import "./style.css";
import FormData from "../../components/FormData";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import { CustomAxios } from "../../Utils/axios";
import { ToastContainer, toast } from "react-toastify/unstyled";
import NavBar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
  });

  const OnInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const OnButton = async () => {
    setLoading(true);

    if (
      !data.fname ||
      !data.lname ||
      !data.email ||
      !data.password ||
      !data.phone
    ) {
      return toast.error("Please fill all the fields"), setLoading(false);
    }

    const response = await CustomAxios.post("/user/register", data);

    if (response.data.message) {
      return (
        setData({
          ...data,
          fname: "",
          lname: "",
          email: "",
          password: "",
          phone: "",
        }),
        toast.success("User Registered Successfully"),
        setLoading(false)
      );
    } else if (response.data.error) {
      return toast.error("Email already exist"), setLoading(false);
    }
  };

  useEffect(() => {}, [data]);

  return (
    <div className="user-reg-main">
      <i onClick={() => navigate(-1)} class="fa-solid fa-circle-arrow-left"></i>
      <div className="user-reg">
        <ToastContainer></ToastContainer>

        <NavBar heading={"User Register"}></NavBar>

        <FormData
          placeholder={"First Name"}
          type={"text"}
          name={"fname"}
          onChange={OnInput}
          value={data.fname}
        ></FormData>
        <FormData
          placeholder={"Last Name"}
          type={"text"}
          name={"lname"}
          onChange={OnInput}
          value={data.lname}
        ></FormData>
        <FormData
          placeholder={"Email id"}
          type={"email"}
          name={"email"}
          onChange={OnInput}
          value={data.email}
        ></FormData>
        <FormData
          placeholder={"Mob.no"}
          type={"number"}
          name={"phone"}
          onChange={OnInput}
          value={data.phone}
        ></FormData>
        <FormData
          placeholder={"Password"}
          type={"password"}
          name={"password"}
          onChange={OnInput}
          value={data.password}
        ></FormData>
        <Button
          children={loading ? "loading..." : "Register"}
          onClick={OnButton}
        ></Button>
        <p>or</p>
        <Button
          children={"Login Page"}
          onClick={() => navigate("/login")}
        ></Button>
      </div>
    </div>
  );
};

export default UserRegister;
