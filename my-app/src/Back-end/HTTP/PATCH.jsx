import { useState } from "react";

function usePatch({ Data, token, FORM_ENDPOINT }) {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    fetch(FORM_ENDPOINT, {
      method: "PATCH",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(Data),
    })
      .then((response) => {
        if (response.status === 200) {
          setMessage("successo");
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
        } else if (response.status === 422) {
          setMessage("entidade nao processavel");
        } else {
          setMessage("erro");
        }

        console.table(response);
        return response.json();
      })
      .then(() => {
        setMessage("OK");
        setStatus("success");
      })
      .catch((err) => {
        setMessage(err.toString());
        setStatus("error");
      });
  };

  return { handleSubmit, status, message };
}

export default usePost;
