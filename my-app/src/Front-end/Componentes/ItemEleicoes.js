import { useState } from "react";
import { Link } from "react-router-dom";

import * as constants from "../constants";
import Button from "./ButtonSmall";

// Recebe props:
//  obj: eleição
//  handleInfo: ação para aceder informacoes da eleicao
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
    width: "80%",
    minWidth: "fit-content",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingInline: "2rem",
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
      <div style={styleText}>{props.obj.nome}</div>
      <div style={{ display: "flex", gap: "2rem" }}>
        <Button
          label="Informações"
          disabled={false}
          handle={props.handleInfo}
        />
        <Link
          to={"vote"}
          state={{ eleicao: props.obj, id: props.obj.id_eleicao }}
          style={{ textDecoration: "none" }}
        >
          <Button label="Votar" handle={null} />
        </Link>
      </div>
    </div>
  );
};

export default Lista;
