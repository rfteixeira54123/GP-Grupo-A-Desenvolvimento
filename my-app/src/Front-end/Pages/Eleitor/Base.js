import { useState, useEffect } from "react";

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
  let [eleicao, setEleicao] = useState("");
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    if (flag) {
      let User = localStorage.getItem("User");
      let desUser = JSON.parse(User);
      setNome(desUser.nome);
      setNumero(desUser.numero);
      setFlag(false);
    }
  });

  const handleState = (page, eleicao) => {
    setState(page);
    setEleicao(eleicao);
  };

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
        return <CandidatosEleição getEleicao={eleicao} />;
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
        nome={nome}
        numId={numero}
        // nome={user.nome}
        // numId={user.numId}
      />
      {content(state)}
    </div>
  );
};

export default Page;
