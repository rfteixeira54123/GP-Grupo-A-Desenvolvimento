import { TableUtilizadores } from "../../Componentes/Table";
import Button from "../../Componentes/Button";
import { FilterUtilizadores } from "../../Componentes/Filter";

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
//  array: objetos do tipo Utilizador
const Page = (props) => {
  return (
    <div style={styleWindow}>
      <div style={styleTitle}>GESTÃO DE CONTAS</div>
      <div style={styleContainer}>
        <FilterUtilizadores />
        <div style={{ width: "96%", height: "inherit", maxHeight: "65vh", }}>
          <TableUtilizadores
            array={[
              {
                id_conta: 0,
                nome: "Nome do Utilizador Completo",
                email: "a20121456@estgoh.ipc.pt",
                numero_id: "a2021258755",
                tipo: "Administrador",
                estado: true,
              },
              {
                id_conta: 1,
                nome: "Nome do Utilizador Completo",
                email: "a20121456@estgoh.ipc.pt",
                numero_id: "a2021258755",
                tipo: "Administrador",
                estado: true,
              },
              {
                id_conta: 2,
                nome: "Nome do Utilizador Completo",
                email: "a20121456@estgoh.ipc.pt",
                numero_id: "a2021258755",
                tipo: "Administrador",
                estado: false,
              },
              {
                id_conta: 3,
                nome: "Nome do Utilizador Completo",
                email: "a20121456@estgoh.ipc.pt",
                numero_id: "a2021258755",
                tipo: "Eleitor",
                estado: true,
              },
              {
                id_conta: 4,
                nome: "Nome do Utilizador Completo",
                email: "a20121456@estgoh.ipc.pt",
                numero_id: "a2021258755",
                tipo: "Eleitor",
                estado: false,
              },
              {
                id_conta: 5,
                nome: "Nome do Utilizador Completo",
                email: "a20121456@estgoh.ipc.pt",
                numero_id: "a2021258755",
                tipo: "Eleitor",
                estado: true,
              },
              {
                id_conta: 6,
                nome: "Nome do Utilizador Completo",
                email: "a20121456@estgoh.ipc.pt",
                numero_id: "a2021258755",
                tipo: "Eleitor",
                estado: false,
              },
              {
                id_conta: 7,
                nome: "Nome do Utilizador Completo",
                email: "a20121456@estgoh.ipc.pt",
                numero_id: "a2021258755",
                tipo: "Eleitor",
                estado: true,
              },
              {
                id_conta: 8,
                nome: "Nome do Utilizador Completo",
                email: "a20121456@estgoh.ipc.pt",
                numero_id: "a2021258755",
                tipo: "Eleitor",
                estado: true,
              },
              {
                id_conta: 9,
                nome: "Nome do Utilizador Completo",
                email: "a20121456@estgoh.ipc.pt",
                numero_id: "a2021258755",
                tipo: "Eleitor",
                estado: true,
              },
            ]}
          />
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
