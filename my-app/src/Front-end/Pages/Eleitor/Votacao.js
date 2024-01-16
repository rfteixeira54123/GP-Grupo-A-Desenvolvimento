import { useState } from "react";

import * as constants from "../../constants";
import Logo from "../../Imagens/Full_Blue_Icon.png";
import ListaCandidatos from "../../Componentes/ListaCandidatos";
import Popup from "../../Componentes/PopupConfirma";

const styleWindow = {
  display: "flex",
  alignItems: "center",
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

//Definir candidatos a exibir
const array = [
  { id: 0, nome: "AAAAAAA" },
  { id: 1, nome: "BBBBBBBB" },
  { id: 2, nome: "BBBBBB" },
  { id: 3, nome: "BBBBBBBB" },
  { id: 4, nome: "BBBBBBBB" },
  { id: 5, nome: "BBBBBBBB" },
  { id: 6, nome: "BBBBBBBB" },
  { id: 7, nome: "BBBBBBBB" },
  { id: 8, nome: "BBBBBBBB" },
  { id: 9, nome: "BBBBBBBB" },
  { id: 10, nome: "BBBBBBBB" },
  { id: 11, nome: "BBBBBBBB" },
  { id: 12, nome: "BBBBBBBB" },
  { id: 13, nome: "CCCCCC" },
];
const nome = "";

const Window = () => {
  let [state, setState] = useState(0);

  function handleState(page) {
    setState(page);
    console.log(page)
  }

  const defineContent = () => {
    switch (state) {
      default:
        return (
          <>
            <div style={styleWindow}>Hello World!</div>
          </>
        );
      case 0:
        return <ListaCandidatos array={array} OnHandleBtn={handleState}/>;

      case 1:
        return <Popup OnHandleBtn={handleState} />;
    }
  };
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
      {defineContent(0)}
    </div>
  );
};

export default Window;
