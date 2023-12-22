import { useState } from "react";

export default function useForm({ additionalData }) {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const data = { Teste: 200 };
    fetch("https://gp-api-alpha.vercel.app/eleicao/votar", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then(() => {
        setStatus("Sucesso");
      })
      .catch((err) => {
        setStatus("ERRO");
      });
  };

  return (
    <div className="pt-0 mb-3">
      <button
        className="active:bg-blue-600 hover:shadow-lg focus:outline-none px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-blue-500 rounded shadow outline-none"
        type="submit"
      >
        POST
      </button>
    </div>
  );
}
