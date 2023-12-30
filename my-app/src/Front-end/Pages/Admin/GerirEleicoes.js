
import { TableEleicoes } from "../../Componentes/Table";
import Button from "../../Componentes/Button";
import { FilterEleicoes } from "../../Componentes/Filter";

import * as constants from "../../constants";

const styleWindow = {
  width: "100%",
  margin: "1rem",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const styleTitle = {
  color: "#23204a",
  fontSize: "22px",
  width: "100%",
  letterSpacing: 0,
  fontWeight: 600,
  lineHeight: "normal",
  textShadow: "0px 4px 4px #00000040",
  marginBlock: "15px",
};

const styleContainer = {
  width: "100%",
  height: "100%",
  background: constants.color.gray2,
  border: "2px " + constants.color.secondary + " solid",
  borderRadius: "25px",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

// Recebe props:
//  array: objetos do tipo Eleicao
const Page = (props) => {
  return (
    <div style={styleWindow}>
      <div style={styleTitle}>GESTÃO DE CONTAS</div>
      <div style={styleContainer}>
        <FilterEleicoes />
        <div style={{ width: "96%", height: "inherit", maxHeight: "65vh",}}>
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
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            paddingBlock: "1.5rem",
          }}
        >
          <Button id="a" label="Desativar Selecionados" />
          <Button id="a" label="Adicionar Conta" />
          <Button id="a" label="Remover Selecionados" />
        </div>
      </div>
    </div>
  );
};

export default Page;
