
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

const styleList = {
  minWidth: "fit-content",
  width: "20rem",
  margin: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

const styleContainer = {
  position: "relative",
  backgroundColor: constants.color.primary_light,
  borderRadius: "25px",
  height: "70%",
  overflowY: "auto",
  width: "60rem",
  minWidth: "fit-content",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBlock: "1rem",
};

// Recebe:
//  array: {nome, id} do candidato
//  OnHandleBtn: ação do botão
const List = ({ array, OnHandleBtn }) => {
  return (
    <>
      <div style={styleContainer}>
        <div style={styleTop}>Candidatos</div>
        <div></div>
      </div>
      <div style={{display: "flex", gap: "5rem"}}>
        <div style={{ width: "18rem", marginTop: "1.5rem" }}>
          <Button id="" label="Cancelar" handle={() => OnHandleBtn(0)} />
        </div>
        <div style={{ width: "18rem", marginTop: "1.5rem" }}>
          <Button id="" label="Confirmar" handle={() => OnHandleBtn(2)} />
        </div>
      </div>
    </>
  );
};

export default List;
