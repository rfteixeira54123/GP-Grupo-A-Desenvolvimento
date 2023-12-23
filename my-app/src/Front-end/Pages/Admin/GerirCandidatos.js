import Menu from "../../Componentes/Menu";
import Perfil from "../../Componentes/Perfil";

import * as links from "../../links";

const stylePage = {
  position: "relative",
  height: "100vh",
};

const Page = () => {
  return (
    <div style={stylePage}>
      <Menu
        id={["MenuBtn1", "MenuBtn2", "MenuBtn3", "MenuBtn4"]}
        label={[
          "Gestão de Contas",
          "Gestão de Eleições",
          "Gestão de Candidatos",
          "Gestão de Eventos"
        ]}
        state={[false, false, true, false]}
        link={[
          links.rotas.MenuAdmin1,
          links.rotas.MenuAdmin2,
          links.rotas.MenuAdmin3,
          links.rotas.MenuAdmin4
        ]}
      />
      <Perfil
        nome="Nome Teste do Utilizador Completo"
        numId="a2020356847teste"
      />
    </div>
  );
};

export default Page;
