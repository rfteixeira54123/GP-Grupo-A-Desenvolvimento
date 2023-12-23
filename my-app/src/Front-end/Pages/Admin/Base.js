import { useState } from "react";

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
const Page = ({user}) => {
  let[state, setState] = useState(0);

  function handleState (page) {
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
          "Gestão de Eventos"
        ]}
        state={state}
        handle={handleState}
      />
      <Perfil
      nome="Nome Teste de Utilizador" numId="a2021101569test"
        // nome={user.nome}
        // numId={user.numId}
      />
      <Conteudo state={state}/>
    </div>
  );
};

export default Page;
