import { useEffect, useState } from "react";
import Spinner from 'react-bootstrap/Spinner';

import { TableEleicoes } from "../../Componentes/Table";
import Button from "../../Componentes/Button";
import Filter from "../../Componentes/Filter";
import RemoverEleicao from "./RemoverEleicao";
import FormEleicao from "./FormEleicao";
import * as constants from "../../constants";

import Candidato from "../../../Back-end/Objetos/ClassCandidato";
import GereCandidatos from "../../../Back-end/GereClasses/GereCandidatos";
import Eleicao from "../../../Back-end/Objetos/ClassEleicao";
import { GereEleicao } from "../../../Back-end/GereClasses/GereEleicoes";
import useGet from "../../../Back-end/HTTP/GET";

const styleWindow = {
  width: "100%",
  margin: "1rem",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const styleTitle = {
  color: constants.color.secondary,
  fontSize: "22px",
  width: "100%",
  letterSpacing: 0,
  fontWeight: 600,
  lineHeight: "normal",
  textShadow: constants.shadow.md,
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
//  array: objetos do tipo Eleicao
const Page = () => {
  //##########################################################################
  //Atualizações -> Implementação do pedido GET
  const [flag, setFlag] = useState(true);
  const [showButtons, setShowButtons] = useState(false);
  const [selected, setSelected] = useState([]);
  const [toEdit, setToEdit] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [forceRenderButtons, setForceRenderButtons] = useState(false);
  const [statePopup, setStatePopup] = useState(10);
  const [forceRenderTable, setForceRenderTable] = useState(false);

  const [eleicoes, setEleicoes] = useState([]);
  const [gereEleicao] = useState(new GereEleicao());

  const { handleGetSubmit, status, message, res } = useGet({
    FORM_ENDPOINT: "https://gp-api-alpha.vercel.app/eleicao/listar",
  });

  useEffect(() => {
    if (flag) {
      handleGetSubmit();
      setFlag(false);
    }
  });

  useEffect(() => {
    if (res && res.Eleicoes && Array.isArray(res.Eleicoes)) {
      const eleicaoList = res.Eleicoes.map((eleicao) => ({
        id_eleicao: eleicao.id_eleicao,
        nome: eleicao.nome,
        cargo_disputa: eleicao.cargo_disputa,
        data_inicio: eleicao.data_inicio,
        data_fim: eleicao.data_fim,
      }));
      setEleicoes(eleicaoList);
      handleOptionClick();
    }
  }, [res]);

  const updateShowButtons = (array) => {
    if (array.includes(-1)) {
      setSelected(eleicoes);
    } else {
      let updateSelecionados = [];
      array.map((index) => updateSelecionados.push(eleicoes[index]));
      setSelected(updateSelecionados);
    }

    setShowButtons(array.length > 1 || array.includes(-1));
    setForceRenderButtons((prevState) => !prevState);
  };

  const handleOptionClick = () => {
    setForceRenderTable((prevState) => !prevState);
    setStatePopup(0);
  };

  const handleDelete = (obj) => {
    setToDelete(obj);
    setStatePopup(4);
  };

  const handleEdit = (obj) => {
    setToEdit(obj);
    setStatePopup(3);
  };

  const handleAdd = (obj) => {
    let updateEleicoes = [...eleicoes];
    updateEleicoes.push(obj);
    setEleicoes(updateEleicoes);
    handleOptionClick();
    setStatePopup(0);
  };

  const handleEdited = (obj) => {
    let updatedEleicoes = [...eleicoes];

    // Use map para percorrer o array e substituir o objeto correspondente
    updatedEleicoes = updatedEleicoes.map((eleicao) => {
      if (eleicao.id_eleicao === obj.id_eleicao) {
        // Se o id_eleicao for igual, substitua o objeto
        return obj;
      }
      // Caso contrário, mantenha o objeto inalterado
      return eleicao;
    });

    setEleicoes(updatedEleicoes);
    handleOptionClick();
    setStatePopup(0);
  };

  const decidePopup = () => {
    switch (statePopup) {
      case 1:
        return (
          <FormEleicao
            handleCancelar={() => setStatePopup(0)}
            handleAdd={(obj) => handleAdd(obj)}
          />
        );
      case 2:
        return (
          <RemoverEleicao
            choice={selected}
            handleCancelar={() => setStatePopup(0)}
          />
        );
      case 3:
        return (
          <FormEleicao
            obj={toEdit}
            handleCancelar={() => setStatePopup(0)}
            handleEdit={(obj) => handleEdited(obj)}
          />
        );
      case 4:
        return (
          <RemoverEleicao
            choice={[toDelete]}
            handleCancelar={() => setStatePopup(0)}
          />
        );
      case 10:
        return  <Spinner animation="border" />;
      default:
        return <></>;
    }
  };

  return (
    <div style={styleWindow}>
      <div style={styleTitle}>GESTÃO DE ELEIÇÕES</div>
      <div style={styleContainer}>
        <Filter id={1} handle={() => handleOptionClick()} />
        <div
          key={forceRenderTable ? "forceRenderTable" : "normalRenderTable"}
          style={{
            width: "96%",
            height: "inherit",
            maxHeight: forceRenderTable ? "52vh" : "65vh",
          }}
        >
          <TableEleicoes
            handleCheckboxChange={updateShowButtons}
            array={eleicoes}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
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
          <div style={{ gridColumn: 1 }}></div>
          <div style={{ gridColumn: 2 }}>
            <Button label="Adicionar Eleição" handle={() => setStatePopup(1)} />
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

// const array = [
//   {id_eleicao:0, nome: "Nome da eleição", cargo_disputa: "Diretor", data_inicio:"2017-06-01T08:30", data_fim:"2017-08-01T08:30"},
//   {id_eleicao:1, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"2017-06-01T08:30", data_fim:"2017-08-01T08:30"},
//   {id_eleicao:2, nome: "Nome da eleição", cargo_disputa: "Presidente", data_inicio:"2017-06-01T08:30", data_fim:"2017-08-01T08:30"},
//   {id_eleicao:3, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
//   {id_eleicao:4, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
//   {id_eleicao:5, nome: "Nome da eleição", cargo_disputa: "Presidente", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
//   {id_eleicao:6, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
//   {id_eleicao:7, nome: "Nome da eleição", cargo_disputa: "Presidente", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
//   {id_eleicao:8, nome: "Nome da eleição", cargo_disputa: "Diretor", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
//   {id_eleicao:9, nome: "Nome da eleição", cargo_disputa: "Diretor", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
//   {id_eleicao:10, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
//   {id_eleicao:11, nome: "Nome da eleição", cargo_disputa: "Presidente", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
//   {id_eleicao:12, nome: "Nome da eleição", cargo_disputa: "Diretor", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
//   {id_eleicao:13, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
//   {id_eleicao:14, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
//   {id_eleicao:15, nome: "Nome da eleição", cargo_disputa: "Presidente", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
//   {id_eleicao:16, nome: "Nome da eleição", cargo_disputa: "AE", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
//   {id_eleicao:17, nome: "Nome da eleição", cargo_disputa: "Presidente", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"},
//   {id_eleicao:18, nome: "Nome da eleição", cargo_disputa: "Diretor", data_inicio:"10/10/2023 às 07:00", data_fim:"20/12/2023 às 20:00"}
// ];
