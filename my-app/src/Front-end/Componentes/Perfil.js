import { HiMenu } from "react-icons/hi";
import * as constants from "../constants";
import Btn from "./ButtonTopMenu";
import { useState } from "react";
import UseGet from "../../Back-end/HTTP/GET";
import { useNavigate } from "react-router-dom";

const stylePerfil = {
  background: constants.color.white60,
  position: "fixed",
  top: 0,
  right: 0,
  borderRadius: "0 0 0 1rem",
  padding: "1rem 1rem 0.5rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  zIndex: 99999999,
};

const styleTop = {
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  gap: 10,
};

const styleNome = {
  display: "flex",
  alignItems: "flex-end",
  flexDirection: "column",
  color: constants.color.secondary,
  wordWrap: "break-word",
  textAlign: "end",
  filter: constants.shadow.sm,
};

// Recebe props:
//  nome: nome do utilizador
//  numId: número de identificação do utilizador
const Perfil = (props) => {
  const [hovering, setHovering] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    setHovering(!hovering);
  };

  const { handleGetSubmit, status, msg, res } = UseGet({
    Data: null,
    FORM_ENDPOINT: "https://gp-api-alpha.vercel.app/logout",
  });

  const handleLogout = () => {
    handleGetSubmit();
    localStorage.removeItem("Token");
  };

  if (hovering) {
    return (
      <div style={stylePerfil}>
        <div style={styleTop} onClick={handleClick}>
          <div style={styleNome}>
            <div
              style={{
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {props.nome}
            </div>
            <div
              style={{
                fontSize: "14px",
              }}
            >
              {props.numId}
            </div>
          </div>
          <HiMenu size={32} color={constants.color.secondary} />
        </div>
        {/* <Btn id="PerfilBtn1" label="Alterar palavra-passe" link="/" /> */}
        <Btn id="PerfilBtn2" label="Sair" handle={handleLogout} link="/" />
      </div>
    );
  } else {
    return (
      <div style={stylePerfil}>
        <div style={styleTop} onClick={handleClick}>
          <div style={styleNome}>
            <div
              style={{
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {props.nome}
            </div>
            <div
              style={{
                fontSize: "14px",
              }}
            >
              {props.numId}
            </div>
          </div>
          <HiMenu size={32} color={constants.color.secondary} />
        </div>
      </div>
    );
  }
};

export default Perfil;
