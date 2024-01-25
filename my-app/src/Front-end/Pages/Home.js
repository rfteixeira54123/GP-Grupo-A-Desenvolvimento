import Admin from "./Admin/Base";
import Eleitor from "./Eleitor/Base";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./Login";
const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    let User = localStorage.getItem("User");
    let desUser = JSON.parse(User);
    let priv = desUser.privilegio;
    if (!localStorage.getItem("Token")) return <Login />;
    else if (priv == 0) return <Eleitor />;
    else return <Admin />;
  };

  return handleLogin();
};

export default Home;
