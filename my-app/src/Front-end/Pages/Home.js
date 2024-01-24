import Admin from "./Admin/Base";
import Eleitor from "./Eleitor/Base";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./Login";
const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    let option = false;

    if (!localStorage.getItem("Token")) return <Login />;
    else if (option) return <Eleitor />;
    else return <Admin />;
  };

  return handleLogin();
};

export default Home;
