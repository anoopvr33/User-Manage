import "./style.css";
import FormData from "../../components/FormData";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import { CustomAxios } from "../../Utils/axios";
import { ToastContainer, toast } from "react-toastify/unstyled";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../Navbar";

const EditData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reset, setReset] = useState(false);
  const [valid, setValid] = useState(null);
  const [newpass, setNewPass] = useState(null);
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
  });

  const GetUser = async () => {
    const response = await CustomAxios.get(`/user/profile/${id}`);
    setData(response.data);
  };

  const CheckOld = (e) => {
    e.preventDefault();
    setValid(e.target.value);
  };

  const OnValid = async () => {
    if (!valid) {
      return toast.error("please enter old password");
    }
    if (!newpass) {
      return toast.error("Please enter a new password");
    }

    const response = await CustomAxios.post(`/user/reset/${id}`, {
      password: valid,
    });

    console.log("mess", response);

    if (response.data.message) {
      const res = await CustomAxios.patch(`/user/edit/${id}`, {
        password: newpass,
      });
      console.log("res", res);
      if (res.data.mess) {
        toast.success("Successfull changed");
        setReset(false);
        GetUser();
        setValid(null);
        setNewPass(null);
      }
    } else if (response.data.error) {
      toast.error(response.data.error);
    }
  };

  const OnInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const OnButton = async () => {
    if (!data.fname || !data.lname || !data.email || !data.password) {
      return toast.error("Please fill all the fields");
    }

    const response = await CustomAxios.patch(`/user/edit/${id}`, data);

    if (response.data.message) {
      return toast.success("User Updated Successfully");
    } else {
      return toast.error("error occured");
    }
  };

  useEffect(() => {
    GetUser();
  }, []);

  useEffect(() => {}, [data, valid, newpass]);

  return (
    <div className="user-reg-main">
      <i onClick={() => navigate(-1)} class="fa-solid fa-circle-arrow-left"></i>
      <div className="user-reg">
        <ToastContainer></ToastContainer>
        <NavBar heading={"User Edit"}></NavBar>
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

        {reset && (
          <div className="reset-pass">
            <FormData
              placeholder={"old password"}
              type={"password"}
              name={"password"}
              onChange={CheckOld}
              // value={data.password}
            ></FormData>
            <FormData
              placeholder={"new password"}
              type={"password"}
              name={"password"}
              onChange={(e) => setNewPass(e.target.value)}
              // value={data.password}
            ></FormData>
            <div className="reset-btns">
              <Button onClick={OnValid} children={"change password"}></Button>
              <Button
                onClick={() => setReset(false)}
                children={"cancel"}
              ></Button>
            </div>
          </div>
        )}
        {!reset && (
          <Button
            children={"Reset Password"}
            onClick={() => setReset(!reset)}
          ></Button>
        )}

        <Button children={"Register"} onClick={OnButton}></Button>
      </div>
    </div>
  );
};

export default EditData;
