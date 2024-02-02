import { useState } from "react";

function UsePost({ Data, FORM_ENDPOINT }) {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [res, setRes] = useState("");

  const handleSubmit = () => {
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
          throw "Credenciais inválidas.";
        } else if (response.status === 403) {
          throw "Você não tem permissão para aceder essa funcionalidade.";
        } else if (response.status === 500) {
          alert("Erro ao contactar o servidor! tente mais tarde. ");
          throw "Erro ao contactar o servidor! tente mais tarde.";
        } else if (response.status === 501) {
          alert("Erro ao contactar o servidor! tente mais tarde. ");
          throw "Erro ao contactar o servidor! tente mais tarde.";
        } else if (response.status === 415) {
          alert("Erro ao contactar o servidor! tente mais tarde.  ");
          throw "Erro ao contactar o servidor! tente mais tarde. ";
        } else if (response.status === 422) {
          throw "Campos não tem caracteres mínimos.";
        } else if (response.status === 425) {
          throw "Campos não tem caracteres mínimos.";
        } else {
          alert("Erro ao contactar o servidor! tente mais tarde. ");
          throw "Erro.";
        }
      })
      .then((data) => {
        setRes(data);
        if (data.token) localStorage.setItem("Token", data.token);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return { handlePostSubmit: handleSubmit, status, message, res };
}

export default UsePost;
