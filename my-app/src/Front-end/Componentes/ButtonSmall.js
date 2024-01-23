import { Link } from "react-router-dom";
import * as constants from "../constants";
import { useState } from "react";

// Recebe props:
//  label: texto do botão (obrigatório)
//  disabled: boleano que define se o botão está válido. (opcional)
//  danger: booleano que muda a cor do botão para vermelho (opcional)
// Escolhe entre handle ou link a ação do botão:
//  link: rota que mostra a nova página ao clique do botão.
//  handle: método a executar ao clique do botão.
const Btn = (props) => {
  const [hovering, setHovering] = useState(false);

  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
  };

  const decideColor = () => {
    if (props.disabled) return constants.color.dark_gray;
    else if (props.danger)
      if (hovering) return constants.color.red;
      else return constants.color.red_light;
    else if (hovering) return constants.color.secondary;
    else return constants.color.primary; // Cor alterada quando hover
  };

  const buttonStyle = {
    backgroundColor: decideColor(), // Cor alterada quando hover
    transition: "background-color 0.3s ease", // Adicionando transição suave na mudança de cor
    width: "10rem",
    minWidth: "fit-content",
    height: "2.5rem",
    border: "none",
    borderRadius: "30px",
    margin: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const labelStyle = {
    color: constants.color.white,
    fontSize: "14px",
    fontWeight: "600",
    letterSpacing: 0.5,
    paddingInline: "1rem",
    textShadow: constants.shadow.small,
  };

  if (props.link) {
    return (
      <>
        <Link to={props.link} style={{ textDecoration: "none" }}>
          <button
            style={buttonStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            disabled={props.disabled}
          >
            <div style={labelStyle}>{props.label}</div>
          </button>
        </Link>
      </>
    );
  } else {
    return (
      <>
        <button
          style={buttonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          disabled={props.disabled}
          onClick={props.handle}
        >
          <div style={labelStyle}>{props.label}</div>
        </button>
      </>
    );
  }
};

Btn.defaultProps = {
  disabled: false,
  danger: false,
};

export default Btn;
