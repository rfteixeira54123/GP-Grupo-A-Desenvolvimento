import { useState } from "react";

import * as constants from "../constants";

// Recebe props:
//  label: texto do botão
//  show: booleano mostra ou não o botão
//  handle: função do botão
//  disable: Botão desativado (opcional)
const Btn = ({ label, show, handle, disable }) => {
  const [hovering, setHovering] = useState(false);

  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
  };

  const buttonStyle = {
    backgroundColor: disable
      ? constants.color.dark_gray
      : hovering
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
    display: show ? "flex" : "none",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    boxSizing: "content-box",
    boxShadow: constants.shadow.md,
  };

  const labelStyle = {
    fontSize: "16px",
    fontWeight: "600",
    letterSpacing: 1,
    color: constants.color.white,
    textShadow: constants.shadow.md,
  };

  return (
    <>
      <button
        style={buttonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={disable ? null : handle}
      >
        <div style={labelStyle}>{label}</div>
      </button>
    </>
  );
};

Btn.defaultProps = {
  show: true,
  disable: false,
};

export default Btn;
