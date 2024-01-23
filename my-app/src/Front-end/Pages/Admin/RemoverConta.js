import * as constants from "../../constants";
import Button from "../../Componentes/ButtonSmall";

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
//  variant: booleano que define se desativa (true) ou remove (false) o utilizador.
const Info = ({ choice, handleCancelar, variant }) => {
  const handleConfirmarDesativar = () => {
    //Fazer função para desativar contas recebidas no array choice
  };

  const handleConfirmarRemover = () => {
    //Fazer função para remover contas recebidas no array choice
  };


  return (
    <>
      <div style={styleContainer}>
        {choice.length > 1 ? (
          <>
            <div style={styleTop}>{variant ? "Desativar" : "Remover"} contas</div>
            <div
              style={{
                color: constants.color.secondary,
                marginInline: "2rem",
                marginBlock: "1rem",
              }}
            >
              {" "}
              Tem a certeza que deseja {variant ? "desativar" : "remover"} todas as {choice.length} contas selecionadas
              ?
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
                handle={variant ? handleConfirmarDesativar : handleConfirmarDesativar}
                danger={true}
                disabled={true}
              />
            </div>
          </>
        ) : (
          <>
            <div style={styleTop}>{variant ? "Desativar" : "Remover"} conta</div>
            <div
              style={{
                color: constants.color.secondary,
                marginInline: "2rem",
                marginBlock: "1rem",
              }}
            >
              Tem a certeza que deseja {variant ? (choice[0].estado ? "desativar" : "ativar") : "remover"} o utilizador ?
              <br />Nome: {choice[0].nome}
              <br />Nº de ID: {choice[0].numero_id}
              <br />Email: {choice[0].email}
              <br />Tipo: {choice[0].tipo}
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
                handle={variant ? handleConfirmarDesativar : handleConfirmarDesativar}
                danger={true}
                disabled={true}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Info;
