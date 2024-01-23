import { useState } from "react";
import * as constants from "../constants";

import CheckBox from "./CheckBox";

const styleHeader = {
  background: constants.color.primary_light,
  height: "2rem",
  position: "sticky",
  top: 0,
  boxShadow: "0px 0px 1px 2px " + constants.color.secondary,
};

const styleHeaderText = {
  color: constants.color.secondary,
  fontSize: "14px",
  fontWeight: "500",
  letterSpacing: 1,
  minWidth: "1.8rem",
  wordWrap: "break-word",
  textAlign: "center",
  padding: "0.3rem",
  paddingInline: "0.7rem",
  border: "1px " + constants.color.secondary + " solid",
};

const styleCell = {
  color: constants.color.secondary,
  fontSize: "16px",
  minWidth: "2rem",
  fontWeight: "500",
  wordWrap: "break-word",
  textAlign: "center",
  padding: "0.3rem",
  paddingInline: "0.7rem",
  border: "1px " + constants.color.secondary + " solid",
};

const Mini = ({ candidatos, selecionados, handleCheckboxChange }) => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(selecionados);

  const handleChange = (checkboxId) => {
    let updatedCheckboxes = [];

    // Atualiza a lista de checkBoxes selecionados
    if (!selectedCheckboxes.includes(checkboxId)) {
      updatedCheckboxes = [...selectedCheckboxes, checkboxId];
    } else {
      updatedCheckboxes = selectedCheckboxes.filter((id) => id !== checkboxId);
    }

    setSelectedCheckboxes(updatedCheckboxes);
    console.log(updatedCheckboxes);
    handleCheckboxChange(
      candidatos.filter((candidato) =>
        updatedCheckboxes.includes(candidato.id_candidato)
      )
    );
  };

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead style={styleHeader}>
        <tr>
          <th style={styleHeaderText}></th>
          <th style={styleHeaderText}>Nome</th>
          <th style={styleHeaderText}>Tipo</th>
        </tr>
      </thead>
      <tbody>
        {candidatos.map((obj, index) => (
          <tr>
            <td style={{ ...styleCell, padding: "0px", paddingInline: "0px" }}>
              <CheckBox
                state={selecionados.includes(obj.id_candidato)}
                onChange={() => handleChange(obj.id_candidato)}
              />
            </td>
            <td style={styleCell}>{obj.nome}</td>
            <td style={styleCell}>{obj.tipo}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Mini;
