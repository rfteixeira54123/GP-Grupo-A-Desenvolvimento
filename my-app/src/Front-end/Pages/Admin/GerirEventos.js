import {TableEventos} from "../../Componentes/Table";
import Button from "../../Componentes/Button";
import * as constants from "../../constants";

import React, { useState } from "react";

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

const Page = () => {
  const [showButtons, setShowButtons] = useState(false);

  const updateShowButtons = (array) => {
    console.log(array);
    setShowButtons(array.length > 1 || array.includes(-1));
    handleRenderButtons();
  };

  const [forceRenderButtons, setForceRenderButtons] = useState(false);

  const handleRenderButtons = () => {
    setForceRenderButtons((prevState) => !prevState);
  };

  return (
    <div style={styleWindow}>
      <div style={styleTitle}>GESTÃO DE EVENTOS</div>
      <div style={styleContainer}>
        <div
          style={{
            width: "80%",
            height: "inherit",
            maxHeight: "72vh",
            marginTop: "1rem",
          }}
        >
          <TableEventos 
            handleCheckboxChange={updateShowButtons}
            array={[
              {id_evento: 0, nome: "ANome do Evento ", data: "22/10/2023 às 15:30"},
              {id_evento: 1, nome: "Nome do Evento ", data: "22/10/2023 às 15:30"},
              {id_evento: 2, nome: "Nome do Evento ", data: "22/10/2023 às 15:30"},
              {id_evento: 3, nome: "BNome do Evento ", data: "22/10/2023 às 15:30"},
              {id_evento: 4, nome: "Nome do Evento ", data: "22/10/2023 às 15:30"},
              {id_evento: 5, nome: "Nome do Evento ", data: "22/10/2023 às 15:30"},
              {id_evento: 6, nome: "Nome do Evento ", data: "22/10/2023 às 15:30"},
            ]}/>
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
            <Button label="Adicionar Evento" />
          </div>
          <div style={{ gridColumn: 3 }}>
            <Button label="Remover Selecionados" show={showButtons} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;