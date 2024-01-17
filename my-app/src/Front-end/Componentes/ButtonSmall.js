import { Link } from "react-router-dom";
import * as constants from "../constants";
import { useState } from "react";

// Recebe props:
//  id: identificador do botão
//  label: texto do botão
//  link: rota que mostra a nova página ao clique do botão.
//  handle: método a executar ao clique do botão.
//  disabled: boleano que define se o botão está válido.
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
    backgroundColor: props.disabled
      ? constants.color.dark_gray
      : hovering
      ? constants.color.secondary
      : constants.color.primary, // Cor alterada quando hover
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
            id={props.id}
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
            id={props.id}
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
};

export default Btn;
