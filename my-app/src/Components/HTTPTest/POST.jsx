import { useState } from "react";

function usePost({ additionalData }) {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const finalFormEndpoint = e.target.action;
    const postData = Array.from(e.target.elements)
      .filter((input) => input.name)
      .reduce(
        (obj, input) => Object.assign(obj, { [input.name]: input.value }),
        {}
      );

    if (additionalData) {
      Object.assign(postData, additionalData);
    }

    fetch(finalFormEndpoint, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token_Aluno",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (response.status === 200) {
          setMessage("success");
        } else if (response.status === 403) {
          setMessage("unauthorized");
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
