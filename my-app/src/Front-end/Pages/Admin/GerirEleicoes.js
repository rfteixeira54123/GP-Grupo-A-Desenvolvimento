import {TableEleicoes} from "../../Componentes/Table";

const styleWindow = {
  background: "pink",
  width: "100%",
  margin: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
};


// Recebe props:
//  array: objetos do tipo Eleicao
const Page = (props) => {
  return (
    <div style={styleWindow}>
      <div style={{width: "96%", height: "80%",}}>
        <TableEleicoes 
          array={[
            {id_eleicao:0, nome: "Nome da eleição", cargo_disputa: "Diretor", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:1, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:2, nome: "Nome da eleição", cargo_disputa: "Presidente", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:3, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:4, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:5, nome: "Nome da eleição", cargo_disputa: "Presidente", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:6, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:7, nome: "Nome da eleição", cargo_disputa: "Presidente", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:8, nome: "Nome da eleição", cargo_disputa: "Diretor", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:9, nome: "Nome da eleição", cargo_disputa: "Diretor", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:10, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:11, nome: "Nome da eleição", cargo_disputa: "Presidente", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:12, nome: "Nome da eleição", cargo_disputa: "Diretor", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:13, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:14, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:15, nome: "Nome da eleição", cargo_disputa: "Presidente", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:16, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:17, nome: "Nome da eleição", cargo_disputa: "Presidente", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
            {id_eleicao:18, nome: "Nome da eleição", cargo_disputa: "Diretor", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"}
          ]}/>
      </div>
    </div>
  );
};

export default Page;