import { useState } from "react";

import * as constants from "../../constants";
import Logo from "../../Imagens/Full_Blue_Icon.png";
import ListaCandidatos from "../../Componentes/ListaCandidatos";
import Popup from "../../Componentes/PopupConfirma";
import PopupFinaliza from "../../Componentes/PopupFinaliza";

const styleWindow = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  width: "100%",
  minWidth: "fit-content",
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
  { id_candidato: 10, nome: "AAAAAAA" },
  { id_candidato: 11, nome: "BBBBBBBB" },
  { id_candidato: 12, nome: "BBBBBB" },
  { id_candidato: 13, nome: "BBBBBBBB" },
  { id_candidato: 14, nome: "BBBBBBBB" },
  { id_candidato: 15, nome: "BBBBBBBB" },
  { id_candidato: 16, nome: "BBBBBBBB" },
  { id_candidato: 17, nome: "BBBBBBBB" },
  { id_candidato: 18, nome: "BBBBBBBB" },
  { id_candidato: 19, nome: "BBBBBBBB" },
  { id_candidato: 110, nome: "BBBBBBBB" },
  { id_candidato: 111, nome: "BBBBBBBB" },
  { id_candidato: 112, nome: "BBBBBBBB" },
  { id_candidato: 113, nome: "CCCCCC" },
];

const nome = "";

const Window = () => {
  let [state, setState] = useState(0);
  let [obj, setObj] = useState(null);

  function handleState(page, choice) {
    setState(page);
    setObj(choice);
    console.log(JSON.stringify(choice));
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
        return (
          <ListaCandidatos
            array={array}
            OnHandleBtn={handleState}
            selected={[array.findIndex((item) => item === obj)]}
          />
        );

      case 1:
        return <Popup OnHandleBtn={handleState} choice={obj} />;
      case 2:
        return <PopupFinaliza />;
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
      {defineContent()}
    </div>
  );
};

export default Window;
