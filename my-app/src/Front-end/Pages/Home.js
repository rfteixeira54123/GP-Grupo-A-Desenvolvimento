import Admin from "./Admin/Base";
import Eleitor from "./Eleitor/Base";
import Login from "./Login";
import UsePost from "../../Back-end/HTTP/POST";
import { useEffect, useState } from "react";
const Home = () => {
  const handleLogin = () => {
    let User = localStorage.getItem("User");
    let desUser = JSON.parse(User);
    let priv = desUser.privilegio;
    if (!localStorage.getItem("Token")) return <Login />;
    else if (priv === 1) return <Eleitor />;
    else return <Admin />;
  };

  useEffect(() => {
    const interval = setInterval(() => {}, 59 * 60 * 1000);
    handlePostSubmit();
    return () => clearInterval(interval);
  }, []);

  const { handlePostSubmit, status, msg, res } = UsePost({
    FORM_ENDPOINT: "https://gp-api-alpha.vercel.app/token/refresh",
  });

  return handleLogin();
};

export default Home;
