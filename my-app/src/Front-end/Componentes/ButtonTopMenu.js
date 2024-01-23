import { Link } from "react-router-dom";
import * as constants from "../constants";
import { useState } from "react";

// Recebe props:
//  label: texto do botão
//  link: rota que mostra a nova página ao clique do botão.
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
    width: "12rem",
    height: 38,
    border: "none",
    borderRadius: 25,
    margin: 3,
    wordWrap: "break-word",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",
    boxShadow: constants.shadow.md,
  };

  const labelStyle = {
    color: constants.color.white,
    fontSize: "14px",
    letterSpacing: 0.5,
    paddingLeft: "1rem",
    textShadow: constants.shadow.small,
  };

  return (
    <>
      <Link to={props.link} style={{ textDecoration: "none" }}>
        <button
          style={buttonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div style={labelStyle}>{props.label}</div>
        </button>
      </Link>
    </>
  );
};

export default Btn;
