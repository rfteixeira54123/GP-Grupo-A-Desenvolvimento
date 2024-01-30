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
          alert("Erro ao contactar o servidor!");
          throw "não autorizado";
        } else if (response.status === 403) {
          alert("Erro ao contactar o servidor!");
          throw "nao autorizado";
        } else if (response.status === 500) {
          alert("Erro ao contactar o servidor! tente mais tarde. ");
          throw "server error";
        } else if (response.status === 501) {
          alert("Erro ao contactar o servidor! tente mais tarde. ");
          throw "nao implementado";
        } else if (response.status === 415) {
          alert("Erro ao contactar o servidor! tente mais tarde.  ");
          throw "nao definido";
        } else if (response.status === 422) {
          alert("Os campos não contêm o tamanho minimo!");
          throw "nao tem tamanho suficiente";
        } else if (response.status === 403) {
          alert("Erro ao contactar o servidor!");
          throw "nao tem permissao";
        } else if (response.status === 425) {
          alert("Os campos não contêm o tamanho minimo!");
          throw "nao tem tamanho suficiente";
        } else {
          alert("Erro ao contactar o servidor!");
          throw "erro";
        }
      })
      .then((data) => {
        // console.log("OK");
        // console.log(data);
        setRes(data);
        try {
          if (data.token) localStorage.setItem("Token", data.token);
        } catch {}
      })
      .catch((error) => {
        // console.log("NOK");
        console.error(error);
      });
  };
  return { handlePostSubmit: handleSubmit, status, message, res };
}

export default UsePost;
