import "./style.css";
import NavBar from "../../components/Navbar/index.jsx";
import UserList from "../../components/UserList/index.jsx";
import Button from "../../components/Button/index.jsx";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <NavBar heading={"User List"}></NavBar>
      <UserList></UserList>
    </div>
  );
};

export default Home;
