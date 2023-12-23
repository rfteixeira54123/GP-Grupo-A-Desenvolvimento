// import { useState } from "react";

import Contas from "./GerirContas";
import Eleicoes from "./GerirEleicoes";
import Candidatos from "./GerirCandidatos";
import Eventos from "./GerirEventos";

const styleWindow = {
  background: "pink",
  width: "100%",
  margin: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const content = (props) => {
  switch (props.state) {
    default:
      return (
        <>
          <div style={styleWindow}>Hello World!</div>
        </>
      );
    case 0:
        return(<Contas/>);

    case 1:
        return(<Eleicoes/>);

    case 2:
        return(<Candidatos/>);

    case 3:
        return(<Eventos/>);
  }
};

export default content;
