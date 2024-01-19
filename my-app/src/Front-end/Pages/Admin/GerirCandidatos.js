import { TableCandidatos } from "../../Componentes/Table";
import Button from "../../Componentes/Button";
import * as constants from "../../constants";

// import useGet from "../HTTPTest/GET";
//import Candidato from "../Objetos/ClassCandidato";
//import GereCandidatos from "../Objetos/GereCandidatos";
//import useGet from "../HTTPTest/GET";

import React, { useState, useEffect } from "react";

const styleWindow = {
  width: "100%",
  margin: "1rem",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const styleTitle = {
  color: constants.color.secondary,
  fontSize: "22px",
  width: "100%",
  letterSpacing: 0,
  fontWeight: 600,
  lineHeight: "normal",
  textShadow: constants.shadow.md,
  marginBlock: "15px",
};

const styleContainer = {
  width: "100%",
  height: "100%",
  background: constants.color.light_gray,
  border: "2px " + constants.color.secondary + " solid",
  borderRadius: "25px",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

// Recebe props:
//  array: objetos do tipo Candidato
const Page = () => {
  const [candidatos, setCandidatos] = useState([]);
  //const [gereCandidatos] = useState(new GereCandidatos());
  // const { handleSubmit, status, message } = useGet({
  //   FORM_ENDPOINT: "https://gp-api-alpha.vercel.app/candidato/listar",
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

  const [showButtons, setShowButtons] = useState(false);

  const updateShowButtons = (array) => {
    // console.log(array);
    setShowButtons(array.length > 1 || array.includes(-1));
    handleRenderButtons();
  };

  const [forceRenderButtons, setForceRenderButtons] = useState(false);

  const handleRenderButtons = () => {
    setForceRenderButtons((prevState) => !prevState);
  };

  return (
    <div style={styleWindow}>
      <div style={styleTitle}>GESTÃO DE CANDIDATOS</div>
      <div style={styleContainer}>
        <div
          style={{
            width: "96%",
            height: "inherit",
            maxHeight: "72vh",
            marginTop: "1rem",
          }}
        >
          <TableCandidatos
            handleCheckboxChange={updateShowButtons}
            array={candidatos}
          />
        </div>
        <div
          key={
            forceRenderButtons ? "forceRenderButtons" : "normalRenderButtons"
          }
          style={{
            width: "96%",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            justifyItems: "center",
            paddingBlock: "1.5rem",
          }}
        >
          <div style={{ gridColumn: 1 }}></div>
          <div style={{ gridColumn: 2 }}>
            <Button id="a" label="Adicionar Candidato" />
          </div>
          <div style={{ gridColumn: 3 }}>
            <Button id="a" label="Remover Selecionados" show={showButtons} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
