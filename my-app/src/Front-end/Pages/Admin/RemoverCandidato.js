import * as constants from "../../constants";
import Button from "../../Componentes/ButtonSmall";
import useDelete from "../../../Back-end/HTTP/DELETE";
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
//  choice: array de ids de candidatos selecionados
//  handleCancelar: método para fechar o popup
const Info = ({ choice, handleCancelar, handleConfirmar }) => {

  const { handleDeleteSubmit } = useDelete({
    Data: {
      ID_Candidato: choice[0].id_candidato,
    },
    FORM_ENDPOINT: "https://gp-api-alpha.vercel.app/candidato/remover",
  });

  const handleRemove = () => {
    setStatePopup(10);
    handleDeleteSubmit().then(() => {
      handleConfirmar();
    });
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
            <div style={styleTop}>Remover candidatos</div>
            <div
              style={{
                color: constants.color.secondary,
                marginInline: "2rem",
                marginBlock: "1rem",
              }}
            >
              {" "}
              Tem a certeza que deseja remover todos os {choice.length}{" "}
              candidatos selecionados ?
            </div>
            <div
              style={{
                display: "flex",
                gap: "4rem",
                marginBottom: "1rem",
              }}
            >
              <Button label="Cancelar" handle={handleCancelar} />
              <Button label="Confirmar" handle={handleRemove} danger={true} />
            </div>
          </>
        ) : (
          <>
            <div style={styleTop}>Remover candidato</div>
            <div
              style={{
                color: constants.color.secondary,
                marginInline: "2rem",
                marginBlock: "1rem",
              }}
            >
              Tem a certeza que deseja remover o candidato ?
              <br />
              Nome: {choice[0].nome}
              <br />
              Tipo: {choice[0].tipo}
            </div>
            <div
              style={{
                backgroundColor: constants.color.primary_light,
                border: "1px solid",
                borderColor: constants.color.secondary,
                borderRadius: "1rem",
                width: "13rem",
                height: "13rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                alt="candidato"
                src={choice[0].foto}
                style={{ width: "100%" }}
              />
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
              <Button label="Confirmar" handle={handleRemove} danger={true} />
            </div>
          </>
        )}
        <div style={stylePopUp}>{decidePopup()}</div>
      </div>
    </>
  );
};

export default Info;
