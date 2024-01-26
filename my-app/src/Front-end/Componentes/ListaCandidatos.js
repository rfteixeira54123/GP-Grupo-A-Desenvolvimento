import { useState } from "react";

import * as constants from "../constants";
import CheckVoto from "./CheckVoto";
import Button from "./FormBtn";

const styleTop = {
  backgroundColor: constants.color.primary,
  color: constants.color.white,
  fontSize: "18px",
  fontWeight: 700,
  textShadow: constants.shadow.md,
  alignContent: "center",
  textAlign: "start",
  paddingInline: "2rem",
  letterSpacing: 1,
  paddingBlock: "10px",
  width: "100%",
  position: "sticky",
  top: 0,
};

const styleList = {
  minWidth: "fit-content",
  width: "20rem",
  margin: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

const styleContainer = {
  position: "relative",
  backgroundColor: constants.color.primary_light,
  borderRadius: "25px",
  height: "70%",
  overflowY: "auto",
  width: "80%",
  maxWidth: "60rem",
  minWidth: "fit-content",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBlock: "1rem",
};

// Recebe:
//  array: {nome, id_candidato} do candidato
//  OnHandleBtn: ação do botão
//  selected: array de posições escolhidas anteriormente.
const List = ({ array, OnHandleBtn, selected }) => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(selected);

  const handleChange = (checkboxId) => {
    let updatedCheckboxes = [];

    // Atualiza a lista de checkBoxes selecionados
    if (!selectedCheckboxes.includes(checkboxId)) {
      updatedCheckboxes = [checkboxId];
    }

    setSelectedCheckboxes(updatedCheckboxes);
    handleOptionClick();
    // console.log(updatedCheckboxes);
  };

  const [forceRender, setForceRender] = useState(false);

  const handleOptionClick = () => {
    setForceRender((prevState) => !prevState);
  };

  return (
    <>
      <div style={styleContainer}>
        <div style={styleTop}>Candidatos</div>
        <div
          style={styleList}
          key={forceRender ? "forceRender" : "normalRender"}
        >
          {array.map((candidato, index) => (
            <CheckVoto
              key={"RowCandidato" + index}
              candidato={candidato}
              onChange={() => handleChange(index)}
              state={index === selectedCheckboxes[0]}
            />
          ))}
        </div>
      </div>
      <div style={{ width: "18rem", marginTop: "1.5rem" }}>
        <Button
          id=""
          label="Submeter voto"
          handle={() => OnHandleBtn(1, array[selectedCheckboxes[0]])}
        />
      </div>
    </>
  );
};

export default List;
