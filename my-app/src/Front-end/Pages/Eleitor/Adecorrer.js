import * as constants from "../../constants";
import ItemEleicoes from "../../Componentes/ItemEleicoes";
import { useState } from "react";

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
  background: constants.color.light_gray,
  borderRadius: "25px",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: "1rem",
  padding: "1rem",
  overflowY: "auto",
};

const array = [
  { id_eleicao: 110, nome: "Presidente" },
  // { name: "Presidente", linkVotar: "vote", linkInfo: "" },
  // { name: "Presidente", linkVotar: "vote", linkInfo: "" },
];

//  Recebe handle para ação do botão de informações de uma eleição
const Adecorrer = ({ handle }) => {
  let [page, setPage] = useState(0);
  let [eleicao, setEleicao] = useState(null);

  const handleInfo = (newPage, obj) => {
    setPage(newPage);
    setEleicao(obj);
    console.log(newPage);
    console.log(JSON.stringify(obj));
    handle(2);
  };

  return (
    <div style={styleWindow}>
      <div style={styleTitle}>ELEIÇÕES A DECORRER</div>
      <div style={styleContainer}>
        {array.length === 0 ? (
          <div>Não existe eleições atuais.</div>
        ) : (
          array.map((obj, index) => (
            <ItemEleicoes
              key={"ELeicao" + index}
              name={obj.nome}
              handleInfo={() => handleInfo(1, obj)}
              linkVotar={"vote"/*/" + obj.id_eleicao*/}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Adecorrer;
