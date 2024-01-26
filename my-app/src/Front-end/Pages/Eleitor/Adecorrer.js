import * as constants from "../../constants";
import ItemEleicoes from "../../Componentes/ItemEleicoes";
import UseGet from "../../../Back-end/HTTP/GET";
import { useEffect } from "react";
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

//  Recebe handle para ação do botão de informações de uma eleição
const Adecorrer = ({ handle }) => {
  const [flag, setFlag] = useState(true);
  const [eleicoes, setEleicoes] = useState([]);

  const { handleGetSubmit, status, message, res } = UseGet({
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
      setEleicoes(eleicoesDecorrer(eleicaoList));
    }
  }, [res]);

  const eleicoesDecorrer = (eleicoes) => {
    const dataAtual = new Date();
    console.log(eleicoes);
    const eleicoesFiltradas = eleicoes.filter((eleicao) => {
      const dataInicio = new Date(eleicao.data_inicio);
      const dataFim = new Date(eleicao.data_fim);

      return dataFim > dataAtual && dataInicio <= dataAtual;
    });

    return eleicoesFiltradas;
  };

  return (
    <div style={styleWindow}>
      <div style={styleTitle}>ELEIÇÕES A DECORRER</div>
      <div style={styleContainer}>
        {eleicoes.length === 0 ? (
          <div>Não existe eleições atuais.</div>
        ) : (
          eleicoes.map((obj, index) => (
            <ItemEleicoes
              key={"Eleicao" + index}
              name={obj.nome}
              handleInfo={() => handle(2, obj)}
              linkVotar={"vote/"+obj.id_eleicao}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Adecorrer;
