import "./style.css";
import { CustomAxios } from "../../Utils/axios.js";
import { useEffect, useState } from "react";
import Button from "../Button/index.jsx";
import SearchBar from "../SearchBar/index.jsx";
import NavBar from "../Navbar/index.jsx";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Confirm from "../ConfirmAlert/index.jsx";

const UserList = () => {
  const navigate = useNavigate();
  const [dlt, setDlt] = useState({});
  const [data, setData] = useState([]);

  const GetUser = async () => {
    const response = await CustomAxios.get("/user/get_all");
    console.log("data", response);
    const DataCollect = response.data.map((i) => {
      return {
        id: i._id,
        name: i.fname + i.lname,
        email: i.email,
        phone: i.phone,
      };
    });
    setData(DataCollect);
  };

  const SearchItem = (item) => {
    if (!item) {
      GetUser();
    }
    const filterData = data.filter((i) => {
      return i.name.toLowerCase().includes(item.toLowerCase());
    });
    if (filterData) setData(filterData);
  };

  const OnDelete = async (id) => {
    const response = await CustomAxios.delete(`/user/delete/${id}`);
    if (response.status === 200) {
      toast.success("deleted");
      GetUser();
      setDlt({});
    }
  };

  useEffect(() => {
    GetUser();
  }, []);

  useEffect(() => {
    console.log("id", dlt);
  }, [data, dlt]);

  return (
    <div className="user-list-main">
      <ToastContainer></ToastContainer>
      {Object.keys(dlt).length != 0 && (
        <Confirm
          Cancel={() => setDlt({})}
          Confirm={() => OnDelete(dlt.id)}
        ></Confirm>
      )}

      <SearchBar Event={SearchItem}></SearchBar>

      <div className="user-list">
        <i
          onClick={() => navigate("/register")}
          class="fa fa-plus-circle"
          aria-hidden="true"
        ></i>
        {data.length === 0 ? (
          <h3>No User!</h3>
        ) : (
          data.map((i, index) => {
            return (
              <div key={index} className="user-card">
                <h4>{i.name}</h4>
                <p>email:{i.email}</p>
                <p>phone:{i.phone}</p>
                <div className="user-btn">
                  <Button
                    onClick={() => navigate(`/edit/${i.id}`)}
                    children={"Edit"}
                  ></Button>
                  <Button
                    onClick={() => setDlt({ id: i.id })}
                    children={"Delete"}
                  ></Button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default UserList;
