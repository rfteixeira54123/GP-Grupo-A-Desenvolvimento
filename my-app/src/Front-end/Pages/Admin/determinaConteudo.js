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
        return(<Contas array={[
          {id_elaicao:0, nome: "Nome da eleição", cargo_disputa: "Diretor", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
          {id_elaicao:1, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
          {id_elaicao:2, nome: "Nome da eleição", cargo_disputa: "Presidente", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
          {id_elaicao:3, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
          {id_elaicao:4, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
          {id_elaicao:5, nome: "Nome da eleição", cargo_disputa: "Presidente", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
          {id_elaicao:6, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
          {id_elaicao:7, nome: "Nome da eleição", cargo_disputa: "Presidente", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
          {id_elaicao:8, nome: "Nome da eleição", cargo_disputa: "Diretor", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
          {id_elaicao:0, nome: "Nome da eleição", cargo_disputa: "Diretor", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
          {id_elaicao:1, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
          {id_elaicao:2, nome: "Nome da eleição", cargo_disputa: "Presidente", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
          {id_elaicao:3, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
          {id_elaicao:4, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
          {id_elaicao:5, nome: "Nome da eleição", cargo_disputa: "Presidente", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
          {id_elaicao:6, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
          {id_elaicao:7, nome: "Nome da eleição", cargo_disputa: "Presidente", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
          {id_elaicao:8, nome: "Nome da eleição", cargo_disputa: "Diretor", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"}
        ]}/>);

    case 1:
        return(<Eleicoes array={[
          {id_elaicao:0, nome: "Nome da eleição", cargo_disputa: "Diretor", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
          {id_elaicao:1, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
          {id_elaicao:2, nome: "Nome da eleição", cargo_disputa: "Presidente", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
          {id_elaicao:3, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
          {id_elaicao:4, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
          {id_elaicao:5, nome: "Nome da eleição", cargo_disputa: "Presidente", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
          {id_elaicao:6, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
          {id_elaicao:7, nome: "Nome da eleição", cargo_disputa: "Presidente", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
          {id_elaicao:8, nome: "Nome da eleição", cargo_disputa: "Diretor", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
          {id_elaicao:0, nome: "Nome da eleição", cargo_disputa: "Diretor", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
          {id_elaicao:1, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
          {id_elaicao:2, nome: "Nome da eleição", cargo_disputa: "Presidente", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
          {id_elaicao:3, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
          {id_elaicao:4, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
          {id_elaicao:5, nome: "Nome da eleição", cargo_disputa: "Presidente", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
          {id_elaicao:6, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
          {id_elaicao:7, nome: "Nome da eleição", cargo_disputa: "Presidente", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
          {id_elaicao:8, nome: "Nome da eleição", cargo_disputa: "Diretor", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"}
        ]}/>);

    case 2:
        return(<Candidatos/>);

    case 3:
        return(<Eventos/>);
  }
};

export default content;
