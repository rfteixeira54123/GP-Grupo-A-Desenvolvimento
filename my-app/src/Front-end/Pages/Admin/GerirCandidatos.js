import { TableCandidatos } from "../../Componentes/Table";
import Button from "../../Componentes/Button";
import RemoverCandidato from "./RemoverCandidato";
import FormCandidato from "./FormCandidato";
import * as constants from "../../constants";

import Candidato from "../../../Back-end/Objetos/ClassCandidato";
import { GereCandidatos } from "../../../Back-end/GereClasses/GereCandidatos";
import useGet from "../../../Back-end/HTTP/GET";
import React, { useState, useEffect } from "react";
import Spinner from 'react-bootstrap/Spinner';

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

const styleBtnsForm = {
  width: "96%",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  justifyItems: "center",
  paddingBlock: "1.5rem",
};

// Recebe props:
//  array: objetos do tipo Candidato
const Page = () => {
  //##########################################################################
  //Atualizações -> Implementação do pedido GET
  const [flag, setFlag] = useState(true);

  const [candidatos, setCandidatos] = useState([]);
  const [gereCandidatos] = useState(new GereCandidatos());
  const { handleGetSubmit, status, message, res } = useGet({
    FORM_ENDPOINT: "https://gp-api-alpha.vercel.app/candidato/listar",
  });

  useEffect(() => {
    if (flag) {
      handleGetSubmit();
      setFlag(false);
    }
  });

  useEffect(() => {
    if (res && res.Candidatos && Array.isArray(res.Candidatos)) {
      const candidatoList = res.Candidatos.map((candidato) => ({
        id_candidato: candidato.id_candidato,
        nome: candidato.nome,
        tipo: candidato.tipo,
        descricao: candidato.objetivo,
        foto: candidato.link_imagem,
      }));
      setCandidatos(candidatoList);
      handleOptionClick();
    }
  }, [res]);

  // Fim das atualizações
  //##########################################################################

  const [showButtons, setShowButtons] = useState(false);
  const [selected, setSelected] = useState([]);
  const [toEdit, setToEdit] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [forceRenderButtons, setForceRenderButtons] = useState(false);
  const [statePopup, setStatePopup] = useState(10);
  const [forceRenderTable, setForceRenderTable] = useState(false);

  const updateShowButtons = (array) => {
    if (array.includes(-1)) {
      setSelected(candidatos);
    } else {
      let updateSelecionados = [];
      array.map((index) => updateSelecionados.push(candidatos[index]));
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
    let updateCandidatos = [...candidatos];
    updateCandidatos.push(obj);
    setCandidatos(updateCandidatos);
    handleOptionClick();
    setStatePopup(0);
  };

  const handleEdited = (obj) => {
    let updateCandidatos = [...candidatos];

    updateCandidatos = updateCandidatos.map((candidato) => {
      if (candidato.id_candidato === obj.id_candidato) {
        return obj;
      }
      return candidato;
    });

    setCandidatos(updateCandidatos);
    handleOptionClick();
    setStatePopup(0);
  };

  const decidePopup = () => {
    switch (statePopup) {
      case 1:
        return (
          <FormCandidato
            handleCancelar={() => setStatePopup(0)}
            handleAdd={(obj) => {
              handleAdd(obj);
            }}
          />
        );
      case 2:
        return (
          <RemoverCandidato
            choice={selected}
            handleCancelar={() => setStatePopup(0)}
          />
        );
      case 3:
        return (
          <FormCandidato
            obj={toEdit}
            handleCancelar={() => setStatePopup(0)}
            handleEdit={(obj) => handleEdited(obj)}
          />
        );
      case 4:
        return (
          <RemoverCandidato
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

  const stylePopUp = {
    display: statePopup === 0 ? "none" : "flex",
    backgroundColor: constants.color.white70,
    position: "absolute",
    bottom: -4,
    left: -4,
    width: "101%",
    height: "101%",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={styleWindow}>
      <div style={styleTitle}>GESTÃO DE CANDIDATOS</div>
      <div style={styleContainer}>
        <div
          key={forceRenderTable ? "forceRenderTable" : "normalRenderTable"}
          style={{
            width: "80%",
            height: "inherit",
            maxHeight: "72vh",
            marginTop: "1rem",
          }}
        >
          <TableCandidatos
            handleCheckboxChange={updateShowButtons}
            array={candidatos}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </div>
        <div
          key={
            forceRenderButtons ? "forceRenderButtons" : "normalRenderButtons"
          }
          style={styleBtnsForm}
        >
          <div style={{ gridColumn: 1 }}></div>
          <div style={{ gridColumn: 2 }}>
            <Button
              label="Adicionar Candidato"
              handle={() => setStatePopup(1)}
            />
          </div>
          <div style={{ gridColumn: 3 }}>
            <Button
              label="Remover Selecionados"
              show={showButtons}
              handle={() => setStatePopup(2)}
            />
          </div>
        </div>
        <div style={stylePopUp}>{decidePopup(statePopup)}</div>
      </div>
    </div>
  );
};

export default Page;

// const array = [
//   { id_candidato: 0, nome: "Nome do Candidato", tipo: "Lista", descricao: "magnis dis parturient montes, nascetur ridiculus mus. Donecquam felis, ultricies nec, pellentesque eu, pretium quis, sem.Nulla consequat massa quis enim. Donec pede justo, fringillavel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncusut, imperdiet a, venenatis vitae, justo. Nullam dictum feliseu pede mollis pretium. Integer tincidunt. Cras dapibus.Vivamus elementum semper nisi. Aenean vulputate eleifend magnis dis parturient montes, nascetur ridiculus mus. Donecquam felis, ultricies nec, pellentesque eu, pretium quis, sem.Nulla consequat massa quis enim. Donec pede justo, fringillavel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncusut, imperdiet a, venenatis vitae, justo. Nullam dictum feliseu pede mollis pretium. Integer tincidunt. Cras dapibus.Vivamus elementum semper nisi. Aenean vulputate eleifend magnis dis parturient montes, nascetur ridiculus mus. Donecquam felis, ultricies nec, pellentesque eu, pretium quis, sem.Nulla consequat massa quis enim. Donec pede justo, fringillavel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncusut, imperdiet a, venenatis vitae, justo. Nullam dictum feliseu pede mollis pretium. Integer tincidunt. Cras dapibus.Vivamus elementum semper nisi. Aenean vulputate eleifend magnis dis parturient montes, nascetur ridiculus mus. Donecquam felis, ultricies nec, pellentesque eu, pretium quis, sem.Nulla consequat massa quis enim. Donec pede justo, fringillavel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncusut, imperdiet a, venenatis vitae, justo. Nullam dictum feliseu pede mollis pretium. Integer tincidunt. Cras dapibus.Vivamus elementum semper nisi. Aenean vulputate eleifend magnis dis parturient montes, nascetur ridiculus mus. Donecquam felis, ultricies nec, pellentesque eu, pretium quis, sem.Nulla consequat massa quis enim. Donec pede justo, fringillavel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncusut, imperdiet a, venenatis vitae, justo. Nullam dictum feliseu pede mollis pretium. Integer tincidunt. Cras dapibus.Vivamus elementum semper nisi. Aenean vulputate eleifend magnis dis parturient montes, nascetur ridiculus mus. Donecquam felis, ultricies nec, pellentesque eu, pretium quis, sem.Nulla consequat massa quis enim. Donec pede justo, fringillavel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncusut, imperdiet a, venenatis vitae, justo. Nullam dictum feliseu pede mollis pretium. Integer tincidunt. Cras dapibus.Vivamus elementum semper nisi. Aenean vulputate eleifendmagnis dis parturient montes, nascetur ridiculus mus. Donecquam felis, ultricies nec, pellentesque eu, pretium quis, sem.Nulla consequat massa quis enim. Donec pede justo, fringillavel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncusut, imperdiet a, venenatis vitae, justo. Nullam dictum feliseu pede mollis pretium. Integer tincidunt. Cras dapibus.Vivamus elementum semper nisi. Aenean vulputate eleifend " },
//   { id_candidato: 1, nome: "Nome do Candidato", tipo: "Lista" },
//   { id_candidato: 2, nome: "Nome do Candidato", tipo: "Presidente" },
//   { id_candidato: 3, nome: "Nome do Candidato", tipo: "Lista" },
//   { id_candidato: 4, nome: "Nome do Candidato", tipo: "Diretor" },
//   { id_candidato: 5, nome: "Nome do Candidato", tipo: "Lista" },
// ];
