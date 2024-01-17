import { TableCandidatos } from "../../Componentes/Table";
// import useGet from "../HTTPTest/GET";
//import Candidato from "../Objetos/ClassCandidato";
//import GereCandidatos from "../Objetos/GereCandidatos";
//import useGet from "../HTTPTest/GET";

import React, { useState, useEffect } from "react";

const styleWindow = {
  background: "pink",
  width: "100%",
  margin: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
};

// Recebe props:
//  array: objetos do tipo Candidato
const Page = () => {
  const [candidatos, setCandidatos] = useState([]);
  //const [gereCandidatos] = useState(new GereCandidatos());
  // const { handleSubmit, status, message } = useGet({
  //   FORM_ENDPOINT: "https://gp-api-alpha.vercel.app/xxx/xxx",
  // });

  // useEffect(() => {
  //   handleSubmit();
  // });

  // useEffect(() => {
  //   if (status === "success") {
  //     const candidatosList = message.map((candidato) => {
  //       const novoCandidato = new Candidato(candidato);
  //       gereCandidatos.inserirCandidato(novoCandidato);
  //       return novoCandidato;
  //     });
  //     setCandidatos(candidatosList);
  //   }
  // }, [status, message, gereCandidatos]);

  return (
    <div style={styleWindow}>
      <div style={{ width: "80%", height: "80%" }}>
        <TableCandidatos array={candidatos} />
      </div>
    </div>
  );
};

export default Page;
