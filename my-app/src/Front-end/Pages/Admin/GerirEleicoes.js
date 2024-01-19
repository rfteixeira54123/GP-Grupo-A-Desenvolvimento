import { useState } from "react";

import { TableEleicoes } from "../../Componentes/Table";
import Button from "../../Componentes/Button";
import Filter from "../../Componentes/Filter";

import * as constants from "../../constants";

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
//  array: objetos do tipo Eleicao
const Page = (props) => {
  const [showButtons, setShowButtons] = useState(false);

  const updateShowButtons = (array) => {
    // console.log(array);
    setShowButtons(array.length > 1 || array.includes(-1));
    handleRenderButtons();
  };

  const [forceRenderTable, setForceRenderTable] = useState(false);

  const handleOptionClick = () => {
    setForceRenderTable((prevState) => !prevState);
  };

  const [forceRenderButtons, setForceRenderButtons] = useState(false);

  const handleRenderButtons = () => {
    setForceRenderButtons((prevState) => !prevState);
  };


  return (
    <div style={styleWindow}>
      <div style={styleTitle}>GESTÃO DE CONTAS</div>
      <div style={styleContainer}>
        <Filter id={1} handle={() => handleOptionClick()} />
        <div
          key={forceRenderTable ? "forceRenderTable" : "normalRenderTable"}
          style={{ width: "96%", height: "inherit", maxHeight: forceRenderTable ? "52vh": "65vh",}}>
        <TableEleicoes 
          handleCheckboxChange={updateShowButtons}
          array={[
            {id_eleicao:0, nome: "Nome da eleição", cargo_disputa: "Diretor", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:1, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:2, nome: "Nome da eleição", cargo_disputa: "Presidente", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:3, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:4, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:5, nome: "Nome da eleição", cargo_disputa: "Presidente", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:6, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:7, nome: "Nome da eleição", cargo_disputa: "Presidente", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:8, nome: "Nome da eleição", cargo_disputa: "Diretor", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:9, nome: "Nome da eleição", cargo_disputa: "Diretor", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:10, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:11, nome: "Nome da eleição", cargo_disputa: "Presidente", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:12, nome: "Nome da eleição", cargo_disputa: "Diretor", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:13, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:14, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:15, nome: "Nome da eleição", cargo_disputa: "Presidente", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:16, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:17, nome: "Nome da eleição", cargo_disputa: "Presidente", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:18, nome: "Nome da eleição", cargo_disputa: "Diretor", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"}
          ]}/>
        </div>
        <div
          key={forceRenderButtons ? "forceRenderButtons" : "normalRenderButtons"}
          style={{
            width: "96%",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            justifyItems:  "center",
            paddingBlock: "1.5rem",
          }}
        >
          <div style={{gridColumn: 1}}></div>
          <div style={{gridColumn: 2}}>
            <Button id="a" label="Adicionar Eleição" />
          </div>
          <div style={{gridColumn: 3}}>
            <Button id="a" label="Remover Selecionados" show={showButtons} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
