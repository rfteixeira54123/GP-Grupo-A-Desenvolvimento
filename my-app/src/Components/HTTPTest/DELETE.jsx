import { useState } from "react";

function useDelete({ additionalData }) {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const finalFormEndpoint = e.target.action;
    const deleteData = Array.from(e.target.elements)
      .filter((input) => input.name)
      .reduce(
        (obj, input) => Object.assign(obj, { [input.name]: input.value }),
        {}
      );

    if (additionalData) {
      Object.assign(deleteData, additionalData);
    }

    fetch(finalFormEndpoint, {
      method: "DELETE",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token_Admin",
      },
      body: JSON.stringify(deleteData),
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

export default useDelete;
