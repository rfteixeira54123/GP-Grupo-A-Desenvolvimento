import * as constants from "../../constants";
import ListaEleicoes from "../../Componentes/ItemEleicoes";

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

const styleWindow = {
  width: "100%",
  margin: "1rem",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const styleContainer = {
  width: "100%",
  background: constants.color.gray2,
  borderRadius: "25px",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: "1rem",
  padding: "1rem",
  overflowY: "auto",
};

const array = [
  { name: "Presidente", linkVotar: "vote/0", linkInfo: "" },
  { name: "Presidente", linkVotar: "vote/1", linkInfo: "" },
  { name: "Presidente", linkVotar: "vote/2", linkInfo: "" },
];

const Adecorrer = () => {
  return (
    <div style={styleWindow}>
      <div style={styleTitle}>ELEIÇÕES A DECORRER</div>
      <div style={styleContainer}>
        {array.map((obj, index) => (
          <ListaEleicoes
            name={obj.name}
            linkInfo={obj.linkInfo}
            linkVotar={obj.linkVotar}
          />
        ))}
      </div>
    </div>
  );
};

export default Adecorrer;
