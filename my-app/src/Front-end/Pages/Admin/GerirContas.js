import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";

import { TableUtilizadores } from "../../Componentes/Table";
import Button from "../../Componentes/Button";
import Filter from "../../Componentes/Filter";
import RemoverConta from "./RemoverConta";
import FormConta from "./FormConta";
import * as constants from "../../constants";
import useGet from "../../../Back-end/HTTP/GET";

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
  const [statePopup, setStatePopup] = useState(10);
  const [showButtons, setShowButtons] = useState(false);
  const [forceRenderButtons, setForceRenderButtons] = useState(false);
  const [forceRenderTable, setForceRenderTable] = useState(false);

  const [contas, setContas] = useState([]);
  const [flag, setFlag] = useState(true);
  const [userId, setUserId] = useState("");

  const { handleGetSubmit, status, message, res } = useGet({
    FORM_ENDPOINT: "https://gp-api-alpha.vercel.app/conta/listar",
  });

  useEffect(() => {
    if (flag) {
      setStatePopup(10);
      handleGetSubmit();
      setFlag(false);
    }
  });

  useEffect(() => {
    if (res && res.Contas && Array.isArray(res.Contas)) {
      const ContasList = res.Contas.map((contas) => ({
        id_conta: contas.id_conta,
        nome: contas.nome,
        email: contas.email,
        numero_id: contas.num_identificacao,
        tipo: contas.tipo,
        estado: contas.estado,
      }));
      setContas(ContasList);
      handleOptionClick();
    }
  }, [res]);

  const updateShowButtons = (array) => {
    console.log(array);
    if (array.includes(-1)) {
      setSelected(contas);
    } else {
      let updateSelecionados = contas.filter((conta) =>
        array.includes(conta.id_conta)
      );
      setSelected(updateSelecionados);
    }
    // console.log(array);
    setShowButtons(array.length > 1 || array.includes(-1));
    setForceRenderButtons((prevState) => !prevState);
  };

  const handleOptionClick = () => {
    setForceRenderTable((prevState) => !prevState);
    setStatePopup(0);
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

  const handleUpdate = () => {
    setFlag(true);
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
            handleAdd={() => handleUpdate()}
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
          //remove varios
          <RemoverConta
            choice={selected}
            handleCancelar={() => setStatePopup(0)}
            handleConfirmar={() => handleUpdate()}
            variant={false}
          />
        );
      case 3:
        return (
          //desativa varios
          <RemoverConta
            choice={selected}
            handleCancelar={() => setStatePopup(0)}
            handleConfirmar={() => handleUpdate()}
            variant={true}
          />
        );
      case 5:
        return (
          // remove 1 (toDelete)
          <RemoverConta
            choice={[toDelete]}
            handleCancelar={() => setStatePopup(0)}
            handleConfirmar={() => handleUpdate()}
            variant={false}
          />
        );
      case 6:
        return (
          //desativa ou ativa 1 (toEnable)
          <RemoverConta
            choice={[toEnable]}
            handleCancelar={() => setStatePopup(0)}
            handleConfirmar={() => handleUpdate()}
            variant={true}
          />
        );
      case 10:
        return <Spinner animation="border" />;
      default:
        return <></>;
    }
  };

  return (
    <div style={styleWindow}>
      <div style={styleTitle}>GESTÃO DE CONTAS</div>
      <div style={styleContainer}>
        <Filter id={0} handle={() => null} />
        <div
          key={forceRenderTable ? "forceRenderTable" : "normalRenderTable"}
          style={{
            width: "96%",
            height: "inherit",
            maxHeight: "65vh",
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
          {decidePopup()}
        </div>
      </div>
    </div>
  );
};

export default Page;
