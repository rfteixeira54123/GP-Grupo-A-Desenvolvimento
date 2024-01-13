import { useState } from "react";

import Menu from "../../Componentes/Menu";
import Perfil from "../../Componentes/Perfil";
import Conteudo from "./determinaConteudo";

const stylePage = {
  position: "relative",
  height: "100vh",
  display: "flex",
};

// Recebe:
//  user: {nome, numId}: dados do utilizador
const Page = ({user}) => {
  let[state, setState] = useState(0);

  function handleState (page) {
    setState(page);
  }

  return (
    <div style={stylePage}>
      <Menu
        id={["MenuEleitor1", "MenuEleitor2"]}
        label={["Eleições a decorrer","Eleições passadas"]}
        state={state}
        handle={handleState}
      />
      <Perfil nome="Nome Teste de Utilizador" numId="a2021101569test"
        // nome={user.nome}
        // numId={user.numId}
      />
      <Conteudo state={state}/>
    </div>
  );
};

export default Page;
