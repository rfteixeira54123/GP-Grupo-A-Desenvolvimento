import { useState } from "react";

import * as constants from "../constants";

// Recebe props:
//  id: identificador do botão
//  label: texto do botão
const Btn = (props) => {
  const [hovering, setHovering] = useState(false);

  const handleMouseEnter = () => {
    if (!props.state) {
      setHovering(true);
    }
  };

  const handleMouseLeave = () => {
    if (!props.state) {
      setHovering(false);
    }
  };

  const buttonStyle = {
    backgroundColor: hovering
      ? constants.color.secondary
      : constants.color.primary, // Cor alterada quando hover
    transition: "background-color 0.3s ease", // Adicionando transição suave na mudança de cor
    width: "15rem",
    minWidth: "fit-content",
    height: "50px",
    border: "none",
    borderRadius: "25px",
    margin: 5,
    wordWrap: "break-word",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    boxSizing: "content-box",
    boxShadow: constants.shadow.md,
  };

  const labelStyle = {
    fontSize: "16px",
    fontWeight: "bold",
    letterSpacing: 1,
    color: constants.color.white,
    textShadow: constants.shadow.md,
  };

  return (
    <>
      <button
        id={props.id}
        style={buttonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div style={labelStyle}>{props.label}</div>
      </button>
    </>
  );
};

export default Btn;
