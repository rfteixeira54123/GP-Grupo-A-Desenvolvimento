import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function UsePost({ Data, FORM_ENDPOINT }) {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [res, setRes] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log(Data);
    setStatus("loading");
    setMessage("");
    return fetch(FORM_ENDPOINT, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("Token"),
      },
      body: JSON.stringify(Data),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 401) {
          navigate("/");
          // throw "não autorizado";
        } else if (response.status === 403) {
          navigate("/");
          // throw "nao autorizado";
        } else if (response.status === 500) {
          throw "Erro no servidor.";
        } else if (response.status === 501) {
          throw "Erro não implementado.";
        } else if (response.status === 415) {
          throw "Erro não definido";
        } else if (response.status === 422) {
          throw "Erro ao realizar pedido.";
        } else {
          // throw "erro";
          throw response.json();
        }
      })
      .then((data) => {
        console.log("OK");
        console.log(data);
        setRes(data);
        try {
          if (data.token) localStorage.setItem("Token", data.token);
        } catch {}
      })
      .catch((error) => {
        console.log("NOK");
        console.error(error);
      });
  };
  return { handlePostSubmit: handleSubmit, status, message, res };
}

export default UsePost;
