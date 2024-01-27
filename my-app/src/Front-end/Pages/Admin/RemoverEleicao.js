import * as constants from "../../constants";
import Button from "../../Componentes/ButtonSmall";
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";

const styleTop = {
  backgroundColor: constants.color.primary,
  borderBottom: "2px solid " + constants.color.secondary,
  color: constants.color.white,
  fontSize: "17px",
  fontWeight: 700,
  textShadow: constants.shadow.md,
  alignContent: "center",
  textAlign: "center",
  paddingInline: "2rem",
  paddingBlock: "10px",
  width: "100%",
  position: "sticky",
  top: 0,
};

const styleContainer = {
  position: "relative",
  backgroundColor: constants.color.white,
  border: "2px solid " + constants.color.secondary,
  borderRadius: "25px",
  overflowY: "auto",
  //   height: "12rem",
  //   width: "80%",
  maxWidth: "50rem",
  minWidth: "fit-content",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBlock: "1rem",
};

// Recebe:
//  choice: array de ids de eleicoes selecionadas
//  handleCancelar: método para fechar o popup
//  handleConfirmar: método para atualizar lista de eleicoes.
const Info = ({ choice, handleCancelar, handleConfirmar }) => {
  const handleRemove = () => {
    // O que é o ID_LISTA_CANDIDATOS na API ?
    // o endpoint apenas suporta remover 1 candidato por cada vez
    //Fazer função para remover eleicoes recebidos no array choice
    console.log("remover");
    setStatePopup(10);
    // handleDeleteSubmit().then(()=>{
    //   handleConfirmar;
    // });
  };

  const [statePopup, setStatePopup] = useState(0);

  const decidePopup = () => {
    switch (statePopup) {
      case 10:
        return <Spinner animation="border" />;
      default:
        return <></>;
    }
  };

  const stylePopUp = {
    display: statePopup === 0 ? "none" : "flex",
    backgroundColor: constants.color.white70,
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <>
      <div style={styleContainer}>
        {choice.length > 1 ? (
          <>
            <div style={styleTop}>Remover eleições</div>
            <div
              style={{
                color: constants.color.secondary,
                marginInline: "2rem",
                marginBlock: "1rem",
              }}
            >
              {" "}
              Tem a certeza que deseja remover todos as {choice.length} eleições
              selecionadas ?
            </div>
            <div
              style={{
                display: "flex",
                gap: "4rem",
                marginBottom: "1rem",
              }}
            >
              <Button label="Cancelar" handle={handleCancelar} />
              <Button
                label="Confirmar"
                handle={handleRemove}
                danger={true}
              />
            </div>
          </>
        ) : (
          <>
            <div style={styleTop}>Remover eleição</div>
            <div
              style={{
                color: constants.color.secondary,
                marginInline: "2rem",
                marginBlock: "1rem",
              }}
            >
              Tem a certeza que deseja remover a eleição ?
              <br />
              Nome: {choice[0].nome}
              <br />
              Tipo: {choice[0].cargo_disputa}
              <br />
              Início: {choice[0].data_inicio}
              <br />
              Fim: {choice[0].data_fim}
            </div>
            <div
              style={{
                display: "flex",
                gap: "4rem",
                marginBlock: "1rem",
                marginInline: "2rem",
              }}
            >
              <Button label="Cancelar" handle={handleCancelar} />
              <Button
                label="Confirmar"
                handle={handleRemove}
                danger={true}
              />
            </div>
          </>
        )}
        <div style={stylePopUp}>{decidePopup()}</div>
      </div>
    </>
  );
};

export default Info;
