import * as constants from "../../constants";
import Button from "../../Componentes/ButtonSmall";
import useDelete from "../../../Back-end/HTTP/DELETE";
import usePatch from "../../../Back-end/HTTP/PATCH";
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
//  choice: array de ids de contas selecionadas
//  handleCancelar: método para fechar o popup
//  handleConfirmar: método para atualizar lista de contas.
//  variant: booleano que define se desativa (true) ou remove (false) o utilizador.
const Info = ({ choice, handleCancelar, variant, handleConfirmar }) => {
  const { handleDeleteSubmit } = useDelete({
    Data: {
      ID_Contas: [choice[0].id_conta],
    },
    FORM_ENDPOINT: "https://gp-api-alpha.vercel.app/conta/remover",
  });

  const { handlePatchSubmit } = usePatch({
    Data: {
      estado: !choice[0].estado,
      ID_Contas: [choice[0].id_conta],
    },
    FORM_ENDPOINT: "https://gp-api-alpha.vercel.app/conta/definir_ativo",
  });

  const handleConfirmarDesativar = () => {
    console.log("desativa");
    console.log(!choice[0].estado, choice[0].id_conta);
    setStatePopup(10);
    handlePatchSubmit().then(() => {
      handleConfirmar();
    });
  };

  const handleConfirmarRemover = () => {
    console.log(choice[0].id_conta);
    console.log("remove esse");
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
            <div style={styleTop}>
              {variant ? "Desativar" : "Remover"} contas
            </div>
            <div
              style={{
                color: constants.color.secondary,
                marginInline: "2rem",
                marginBlock: "1rem",
              }}
            >
              {" "}
              Tem a certeza que deseja {variant ? "desativar" : "remover"} todas
              as {choice.length} contas selecionadas ?
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
                handle={
                  variant ? handleConfirmarDesativar : handleConfirmarDesativar
                }
                danger={true}
              />
            </div>
          </>
        ) : (
          <>
            <div style={styleTop}>
              {variant ? "Desativar" : "Remover"} conta
            </div>
            <div
              style={{
                color: constants.color.secondary,
                marginInline: "2rem",
                marginBlock: "1rem",
              }}
            >
              Tem a certeza que deseja{" "}
              {variant
                ? choice[0].estado
                  ? "desativar"
                  : "ativar"
                : "remover"}{" "}
              o utilizador ?
              <br />
              Nome: {choice[0].nome}
              <br />
              Nº de ID: {choice[0].numero_id}
              <br />
              Email: {choice[0].email}
              <br />
              Tipo: {choice[0].tipo}
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
                handle={
                  variant ? handleConfirmarDesativar : handleConfirmarRemover
                }
                danger={true}
                disabled={false}
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
