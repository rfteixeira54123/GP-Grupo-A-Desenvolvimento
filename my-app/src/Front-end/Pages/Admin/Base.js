import { useState, useEffect } from "react";

// import * as links from "../../links";

import Menu from "../../Componentes/Menu";
import Perfil from "../../Componentes/Perfil";
import Conteudo from "./determinaConteudo";

const stylePage = {
  position: "relative",
  height: "100vh",
  display: "flex",
};

// Recebe:
//  menuStates: array com 4 booleans para definir o estado dos botões do menu
//  user: {nome, numId}: dados do utilizador
const Page = ({ user }) => {
  let [state, setState] = useState(0);
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

  function handleState(page) {
    setState(page);
  }

  return (
    <div style={stylePage}>
      <Menu
        id={["MenuAdmin1", "MenuAdmin2", "MenuAdmin3", "MenuAdmin4"]}
        label={[
          "Gestão de Contas",
          "Gestão de Eleições",
          "Gestão de Candidatos",
          "Gestão de Eventos",
        ]}
        state={state}
        handle={handleState}
      />
      <Perfil
        nome={nome}
        numId={numero}
        // nome={user.nome}
        // numId={user.numId}
      />
      <Conteudo state={state} />
    </div>
  );
};

export default Page;
