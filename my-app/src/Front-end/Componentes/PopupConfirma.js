import * as constants from "../constants";
import Button from "./FormBtn";

const styleTop = {
  backgroundColor: constants.color.primary,
  color: constants.color.white,
  fontSize: "18px",
  fontWeight: 700,
  textShadow: constants.shadow.md,
  alignContent: "center",
  textAlign: "start",
  paddingInline: "2rem",
  letterSpacing: 1,
  paddingBlock: "10px",
  width: "100%",
  position: "sticky",
  top: 0,
};

const styleContainer = {
  position: "relative",
  backgroundColor: constants.color.primary_light,
  borderRadius: "25px",
  overflowY: "auto",
  height: "12rem",
  width: "80%",
  maxWidth: "50rem",
  minWidth: "fit-content",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBlock: "1rem",
};

// Recebe:
//  OnHandleBtn: ação do botão
//  choice: candidato selecionado
const List = ({ OnHandleBtn, choice }) => {
  return (
    <>
      <div style={styleContainer}>
        {(choice && choice.id_candidato) ? (
          <>
            <div style={styleTop}>Confirme seu voto</div>
            <div
              style={{ color: constants.color.secondary, marginTop: "2rem" }}
            >
              Tem a certeza que quer submeter o voto em {choice.nome}?
            </div>
          </>
        ) : (
          <>
            <div style={styleTop}>Voto em branco</div>
            <div
              style={{ color: constants.color.secondary, marginTop: "2rem" }}
            >
              Tem a certeza que quer submeter o voto em branco?
            </div>
          </>
        )}
        <p style={{ color: constants.color.secondary, marginBlock: "2rem" }}>
          Ao confirmar o seu voto é submetido
          <strong> irreversivelmente.</strong>
        </p>
      </div>
      <div style={{ display: "flex", gap: "5rem" }}>
        <div style={{ width: "18rem", marginTop: "1.5rem" }}>
          <Button
            id=""
            label="Cancelar"
            handle={() => OnHandleBtn(0, choice)}
          />
        </div>
        <div style={{ width: "18rem", marginTop: "1.5rem" }}>
          <Button
            id=""
            label="Confirmar"
            handle={() => OnHandleBtn(2, choice)}
          />
        </div>
      </div>
    </>
  );
};

export default List;
