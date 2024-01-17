import { useState } from "react";

import Menu from "../../Componentes/Menu";
import Perfil from "../../Componentes/Perfil";
import Adecorrer from "./Adecorrer";
import Passadas from "./Passadas";
import CandidatosEleição from "./CandidatosEleição";

const stylePage = {
  position: "relative",
  height: "100vh",
  display: "flex",
};

const styleWindow = {
  background: "pink",
  width: "100%",
  margin: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

// Recebe:
//  user: {nome, numId}: dados do utilizador
const Page = ({ user }) => {
  let [state, setState] = useState(0);

  const handleState = (page) => {
    setState(page);
  }

  const content = (page) => {
    switch (page) {
      default:
        return (
          <>
            <div style={styleWindow}>Hello World!</div>
          </>
        );
      case 0:
        return <Adecorrer handle={handleState} />;

      case 1:
        return <Passadas />;
      case 2:
        return <CandidatosEleição />
    }
  };

  return (
    <div style={stylePage}>
      <Menu
        id={["MenuEleitor1", "MenuEleitor2"]}
        label={["Eleições a decorrer", "Eleições passadas"]}
        state={state}
        handle={handleState}
      />
      <Perfil
        nome="Nome Teste de Utilizador"
        numId="a2021101569test"
        // nome={user.nome}
        // numId={user.numId}
      />
      {content(state)}
    </div>
  );
};

export default Page;
