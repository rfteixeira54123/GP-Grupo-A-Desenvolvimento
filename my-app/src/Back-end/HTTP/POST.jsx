import { useState } from "react";

function UsePost({ Data, FORM_ENDPOINT }) {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [res, setRes] = useState("");

  const handleSubmit = () => {
    setStatus("loading");
    setMessage("");

    fetch(FORM_ENDPOINT, {
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
        } else if (response.status === 403) {
          setMessage("nao autorizado");
        } else if (response.status === 500) {
          setMessage("server error");
        } else if (response.status === 501) {
          setMessage("nao implementado");
        } else if (response.status === 415) {
          setMessage("nao definido");
        } else if (response.status === 422) {
          setMessage("json em falta");
        } else if (response.status === 403) {
          setMessage("nao tem permissao");
        } else if (response.status === 422 || response.status === 425) {
          setMessage("nao tem tamanho suficiente");
        } else {
          setMessage("erro");
        }
        return null;
      })
      .then((data) => {
        console.table(data);
        if (data.token) localStorage.setItem("Token", data.token);
      })
      .catch((err) => {
        setMessage(err.toString());
        setStatus("error");
      });
  };
  return { handlePostSubmit: handleSubmit, status, message, res };
}

export default UsePost;
