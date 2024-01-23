import { useState } from "react";

function UseGet({ Data, FORM_ENDPOINT }) {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [res, setRes] = useState("");

  const handleSubmit = () => {
    console.log("Entra no pedido GET");
    setStatus("loading");
    setMessage("");

    return fetch(FORM_ENDPOINT, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("Token"),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 401) {
          throw "não autorizado";
        } else if (response.status === 403) {
          throw "nao autorizado";
        } else if (response.status === 500) {
          throw "server error";
        } else if (response.status === 501) {
          throw "nao implementado";
        } else if (response.status === 415) {
          throw "nao definido";
        } else if (response.status === 422) {
          throw "nao tem tamanho suficiente";
        } else if (response.status === 403) {
          throw "nao tem permissao";
        } else if (response.status === 425) {
          throw "nao tem tamanho suficiente";
        } else {
          throw "erro";
        }
      })
      .then((data) => {
        console.table(data);
        setRes(data);
      })
      .catch((error) => {
        console.error("Erro durante o pedido GET:", error);
      });
  };
  return { handleGetSubmit: handleSubmit, status, message, res };
}

export default UseGet;
