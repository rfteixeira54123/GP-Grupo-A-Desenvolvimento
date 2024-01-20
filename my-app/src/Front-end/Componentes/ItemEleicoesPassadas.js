import { useState } from "react";

import * as constants from "../constants";
import Button from "./ButtonSmall";

// Recebe props:
//  name: identificador da elição
//  linkConsulta: link para aceder informacoes da eleicao
const Lista = (props) => {
  const [hovering, setHovering] = useState(false);

  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
  };

  const styleLine = {
    backgroundColor: constants.color.white,
    borderRadius: "30px",
    boxShadow: hovering ? constants.shadow.bg : constants.shadow.md,
    transition: "box-shadow 0.3s ease",
    width: "95%",
    minWidth: "fit-content",
    height: "60px",
    minHeight: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingInline: "2rem",
    paddingBlock: "1rem",
  };

  const styleText = {
    color: constants.color.secondary,
    fontSize: "18px",
    fontWeight: "bold",
    paddingInline: "1rem",
  };

  return (
    <div
      style={styleLine}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={styleText}>{props.name}</div>
      <Button label="Consultar" link={props.linkConsulta} disabled={true} />
    </div>
  );
};

export default Lista;
