import { Link } from "react-router-dom";

import * as constants from "../../constants";
import Logo from "../../Imagens/Full_Blue_Icon.png";
import Button from "../../Componentes/FormBtn";
import CheckBox from "../../Componentes/CheckBox";

const styleWindow = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
  flexDirection: "column",
  width: "100%",
  height: "100vh",
  padding: "1.5rem",
};

const styleTitle = {
  color: constants.color.secondary,
  fontSize: "24px",
  letterSpacing: 0,
  fontWeight: 600,
  lineHeight: "normal",
  textShadow: constants.shadow.md,
  textAlign: "center",
  marginBlock: "1rem",
};

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
};

const styleContainer = {
  position: "relative",
  backgroundColor: constants.color.primary_light,
  borderRadius: "25px",
  height: "70%",
  overflowY: "auto",
  width: "60rem",
  minWidth: "fit-content",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const array = [
  { nome: "AAAAAAA" },
  { nome: "BBBBBBBB" },
  { nome: "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB BBBBBBBBBBBBBBBBBBBBBBBBB" },
  { nome: "BBBBBBBB" },
  { nome: "BBBBBBBB" },
  { nome: "BBBBBBBB" },
  { nome: "BBBBBBBB" },
  { nome: "BBBBBBBB" },
  { nome: "BBBBBBBB" },
  { nome: "BBBBBBBB" },
  { nome: "BBBBBBBB" },
  { nome: "BBBBBBBB" },
  { nome: "BBBBBBBB" },
  { nome: "CCCCCC" },
];
const nome = "";

// Recebe:
//  nome: nome da eleição
//  array: {nome} nome do candidato
const Window = () => {
  return (
    <div style={styleWindow}>
      <img
        style={{
          width: "9rem",
          padding: "1rem 0 0 2rem",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        src={Logo}
        alt="logo"
      />
      <div style={styleTitle}>ELEIÇÕES DE {nome}</div>
      <div style={styleContainer}>
        <div style={styleTop}>Candidatos</div>
        <div
          style={{
            minWidth: "fit-content",
            width: "20rem",
            margin: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          {array.map((candidato, index) => (
            <div style={{display: "flex", justifyContent: "space-between"}}>
              <div
                style={{
                  color: constants.color.secondary,
                  fontWeight: 600,
                  fontSize: "20px",
                  textAlign: "start",
                }}
              >
                {candidato.nome}
              </div>
              <CheckBox />
            </div>
          ))}
        </div>
      </div>
      <Link to="/to" style={{ width: "18rem", marginTop: "1.5rem" }}>
        <Button id="" label="Submeter voto" />
      </Link>
    </div>
  );
};

export default Window;
