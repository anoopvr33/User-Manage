import "./style.css";
import FormData from "../../components/FormData";
import Button from "../../components/Button";
import { useState } from "react";
import { CustomAxios } from "../../Utils/axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../../components/Navbar";

const UserLogin = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const OnInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const OnButton = async () => {
    if (!data.email || !data.password) {
      return toast.error("Please fill all fields");
    }
    setLoading(true);
    const response = await CustomAxios.post("/user/login", data);
    if (response.data.message) {
      navigate("/");
    } else if (response.data.error) {
      toast.error("invalid credentials");
      setLoading(false);
    }
  };

  return (
    <div className="user-reg-main">
      <i onClick={() => navigate(-1)} class="fa-solid fa-circle-arrow-left"></i>
      <div className="user-reg">
        <ToastContainer></ToastContainer>

        <NavBar heading={"User Login"}></NavBar>

        <FormData
          placeholder={"Email id"}
          type={"email"}
          name={"email"}
          onChange={OnInput}
        ></FormData>
        <FormData
          placeholder={"password"}
          type={"password"}
          name={"password"}
          onChange={OnInput}
        ></FormData>
        <Button
          children={loading ? "Loading..." : "Login"}
          onClick={OnButton}
        ></Button>
      </div>
    </div>
  );
};

export default UserLogin;
