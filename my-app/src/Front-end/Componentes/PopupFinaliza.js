import { Link } from "react-router-dom";

import * as constants from "../constants";
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

const styleContainer = {
  position: "relative",
  backgroundColor: constants.color.primary_light,
  borderRadius: "25px",
  overflowY: "auto",
  height: "12rem",
  maxWidth: "42rem",
  width: "80%",
  minWidth: "fit-content",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBlock: "1rem",
};

// Recebe:
//  linkLogout: ação do botão para encerrar sessão
//  linkHome: ação do botão para voltar a página inicial
const List = () => {
  return (
    <>
      <div style={styleContainer}>
        <div style={styleTop}>Voto submetido com sucesso!</div>
        <p style={{ color: constants.color.secondary, marginBlock: "2rem" }}>
          O seu voto é anónimo e confindencial.
          <br></br>Os seus dados são encriptados.
          <br></br>O voto em segurança é a nossa maior prioridade.
        </p>
      </div>
      <div style={{ display: "flex", gap: "5rem" }}>
        <Link
          to="/home"
          style={{
            textDecoration: "none",
            width: "18rem",
            marginTop: "1.5rem",
          }}
        >
          <Button id="" label="Página inicial" />
        </Link>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            width: "18rem",
            marginTop: "1.5rem",
          }}
        >
          <Button id="" label="Terminar sessão" />
        </Link>
      </div>
    </>
  );
};

export default List;
