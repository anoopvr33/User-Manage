import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./Authentication/UserLogin/index.jsx";
import UserRegister from "./Authentication/UserRegister/index.jsx";
import EditUser from "./pages/UserEdit/index.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<UserLogin />}></Route>
        <Route path="/register" element={<UserRegister />}></Route>
        <Route path="/edit/:id" element={<EditUser />}></Route>
      </Routes>
    </>
  );
}

export default App;
