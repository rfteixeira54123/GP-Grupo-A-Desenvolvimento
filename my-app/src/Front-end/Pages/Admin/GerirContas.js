import { useState } from "react";

import { TableUtilizadores } from "../../Componentes/Table";
import Button from "../../Componentes/Button";
import Filter from "../../Componentes/Filter";
import RemoverConta from "./RemoverConta";
import FormConta from "./FormConta";
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
  background: constants.color.light_gray,
  border: "2px " + constants.color.secondary + " solid",
  borderRadius: "25px",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  position: "relative",
};

// Recebe props:
//  array: objetos do tipo Utilizador
const Page = (props) => {
  const [selected, setSelected] = useState([]);
  const [toEdit, setToEdit] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [toEnable, setToEnable] = useState(null);
  const [statePopup, setStatePopup] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [forceRenderButtons, setForceRenderButtons] = useState(false);
  const [forceRenderTable, setForceRenderTable] = useState(false);

  const [contas, setContas] = useState([]);

  const updateShowButtons = (array) => {
    if (array.includes(-1)) {
      setSelected(contas);
    } else {
      let updateSelecionados = [];
      array.map((index) => updateSelecionados.push(contas[index]));
      setSelected(updateSelecionados);
    }
    // console.log(array);
    setShowButtons(array.length > 1 || array.includes(-1));
    setForceRenderButtons((prevState) => !prevState);
  };

  const handleOptionClick = () => {
    setForceRenderTable((prevState) => !prevState);
  };

  const handleDelete = (obj) => {
    setToDelete(obj);
    setStatePopup(5);
  };

  const handleEdit = (obj) => {
    setToEdit(obj);
    setStatePopup(4);
  };

  const handleEnable = (obj) => {
    setToEnable(obj);
    setStatePopup(6);
  };

  const handleAdd = (obj) => {
    let updateContas = [...contas];
    updateContas.push(obj);
    setContas(updateContas);
    handleOptionClick();
    setStatePopup(0);
  };

  const handleEdited = (obj) => {
    let updateContas = [...contas];

    // Use map para percorrer o array e substituir o objeto correspondente
    updateContas = updateContas.map((conta) => {
      if (conta.id_conta === obj.id_conta) {
        // Se o id_eleicao for igual, substitua o objeto
        return obj;
      }
      // Caso contrário, mantenha o objeto inalterado
      return conta;
    });

    setContas(updateContas);
    handleOptionClick();
    setStatePopup(0);
  };

  const decidePopup = () => {
    switch (statePopup) {
      case 1:
        return (
          <FormConta
            handleCancelar={() => setStatePopup(0)}
            handleAdd={(obj) => handleAdd(obj)}
          />
        );
      case 4:
        return (
          <FormConta
            obj={toEdit}
            handleCancelar={() => setStatePopup(0)}
            handleEdit={(obj) => handleEdited(obj)}
          />
        );
      case 2:
        return (
          <RemoverConta
            choice={selected}
            handleCancelar={() => setStatePopup(0)}
            variant={false}
          />
        );
      case 3:
        return (
          <RemoverConta
            choice={selected}
            handleCancelar={() => setStatePopup(0)}
            variant={true}
          />
        );
      case 5:
        return (
          <RemoverConta
            choice={[toDelete]}
            handleCancelar={() => setStatePopup(0)}
            variant={false}
          />
        );
      case 6:
        return (
          <RemoverConta
            choice={[toEnable]}
            handleCancelar={() => setStatePopup(0)}
            variant={true}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <div style={styleWindow}>
      <div style={styleTitle}>GESTÃO DE CONTAS</div>
      <div style={styleContainer}>
        <Filter id={0} handle={() => handleOptionClick()} />
        <div
          key={forceRenderTable ? "forceRenderTable" : "normalRenderTable"}
          style={{
            width: "96%",
            height: "inherit",
            maxHeight: forceRenderTable ? "46vh" : "65vh",
          }}
        >
          <TableUtilizadores
            handleCheckboxChange={updateShowButtons}
            array={contas}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleEnable={handleEnable}
          />
        </div>
        <div
          key={
            forceRenderButtons ? "forceRenderButtons" : "normalRenderButtons"
          }
          style={{
            width: "96%",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            justifyItems: "center",
            paddingBlock: "1.5rem",
          }}
        >
          <div style={{ gridColumn: 1 }}>
            <Button
              label="Desativar Selecionados"
              show={showButtons}
              handle={() => setStatePopup(3)}
            />
          </div>
          <div style={{ gridColumn: 2 }}>
            <Button label="Adicionar Conta" handle={() => setStatePopup(1)} />
          </div>
          <div style={{ gridColumn: 3 }}>
            <Button
              label="Remover Selecionados"
              show={showButtons}
              handle={() => setStatePopup(2)}
            />
          </div>
        </div>
        <div
          style={{
            display: statePopup === 0 ? "none" : "flex",
            backgroundColor: constants.color.white70,
            position: "absolute",
            bottom: -4,
            left: -4,
            width: "101%",
            height: "101%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {decidePopup(statePopup)}
        </div>
      </div>
    </div>
  );
};

export default Page;

// const array = [
//   {
//     id_conta: 0,
//     nome: "Nome do Utilizador Completo",
//     email: "a20121456@estgoh.ipc.pt",
//     numero_id: "a2021258755",
//     tipo: "Administrador",
//     estado: true,
//   },
//   {
//     id_conta: 1,
//     nome: "Nome do Utilizador Completo",
//     email: "a20121456@estgoh.ipc.pt",
//     numero_id: "a2021258755",
//     tipo: "Administrador",
//     estado: true,
//   },
//   {
//     id_conta: 2,
//     nome: "Nome do Utilizador Completo",
//     email: "a20121456@estgoh.ipc.pt",
//     numero_id: "a2021258755",
//     tipo: "Administrador",
//     estado: false,
//   },
//   {
//     id_conta: 3,
//     nome: "Nome do Utilizador Completo",
//     email: "a20121456@estgoh.ipc.pt",
//     numero_id: "a2021258755",
//     tipo: "Eleitor",
//     estado: true,
//   },
//   {
//     id_conta: 4,
//     nome: "Nome do Utilizador Completo",
//     email: "a20121456@estgoh.ipc.pt",
//     numero_id: "a2021258755",
//     tipo: "Eleitor",
//     estado: false,
//   },
//   {
//     id_conta: 5,
//     nome: "Nome do Utilizador Completo",
//     email: "a20121456@estgoh.ipc.pt",
//     numero_id: "a2021258755",
//     tipo: "Eleitor",
//     estado: true,
//   },
//   {
//     id_conta: 6,
//     nome: "Nome do Utilizador Completo",
//     email: "a20121456@estgoh.ipc.pt",
//     numero_id: "a2021258755",
//     tipo: "Eleitor",
//     estado: false,
//   },
//   {
//     id_conta: 7,
//     nome: "Nome do Utilizador Completo",
//     email: "a20121456@estgoh.ipc.pt",
//     numero_id: "a2021258755",
//     tipo: "Eleitor",
//     estado: true,
//   },
//   {
//     id_conta: 8,
//     nome: "Nome do Utilizador Completo",
//     email: "a20121456@estgoh.ipc.pt",
//     numero_id: "a2021258755",
//     tipo: "Eleitor",
//     estado: true,
//   },
//   {
//     id_conta: 9,
//     nome: "Nome do Utilizador Completo",
//     email: "a20121456@estgoh.ipc.pt",
//     numero_id: "a2021258755",
//     tipo: "Eleitor",
//     estado: true,
//   },
// ];
