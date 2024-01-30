import Carousel from "react-bootstrap/Carousel";
// import "./style.css";

import * as constants from "../../constants";
import { useState, useEffect } from "react";
import UseGet from "../../../Back-end/HTTP/GET";

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
  position: "relative",
  width: "100%",
  height: "100%",
  paddingBlock: "1rem",
  paddingInline: "2rem",
  background: constants.color.light_gray,
  borderRadius: "0 0 25px 25px",
  display: "flex",
  alignItems: "start-flex",
  flexDirection: "column",
};

const styleTop = {
  backgroundColor: constants.color.primary,
  borderRadius: "25px 25px 0 0",
  paddingInline: "2rem",
  paddingBlock: "10px",
  width: "100%",
  position: "sticky",
  top: 0,
  display: "flex",
  flexDirection: "column",
  gap: "4px",
};

const styleName = {
  color: constants.color.white,
  fontSize: "18px",
  fontWeight: 600,
  textShadow: constants.shadow.md,
  textAlign: "start",
  letterSpacing: 1,
};

const styleTime = {
  color: constants.color.secondary,
  fontSize: "14px",
  fontWeight: 500,
  letterSpacing: 0,
};

// Recebe:
//  getEleicao: eleição a exibir
const Dados = ({ getEleicao }) => {
  const [eleicaoId, setEleicaoId] = useState("");
  const [flag, setFlag] = useState(true);
  const [numero, setNumero] = useState("");
  const [candidatos, setCandidatos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (flag) {
      let User = localStorage.getItem("User");
      let desUser = JSON.parse(User);
      setNumero(desUser.numero);
      setEleicaoId(getEleicao.id_eleicao);
      setFlag(false);
    }
  });

  const { handleGetSubmit, status, message, res } = UseGet({
    FORM_ENDPOINT: "https://gp-api-alpha.vercel.app/candidato/listar",
  });

  useEffect(() => {
    if (flag) {
      handleGetSubmit().then(() => setLoading(false));
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
        id_eleicao: candidato.id_eleicao,
      }));
      setCandidatos(filtrarCandidatos(candidatoList));
    }
  }, [res]);

  const filtrarCandidatos = (candidatos) => {
    const candidatosFiltrados = candidatos.filter((candidatos) => {
      return candidatos.id_eleicao == getEleicao.id_eleicao;
    });

    return candidatosFiltrados;
  };

  return (
    <>
      <div style={styleWindow}>
        <div style={styleTitle}>ELEIÇÕES A DECORRER</div>
        <div style={styleTop}>
          <div style={styleName}>Eleição {getEleicao.nome}</div>
          <div style={styleTime}>
            Início: {getEleicao.data_inicio}
            <br />
            Fim: {getEleicao.data_fim}
          </div>
        </div>
        <div style={styleContainer}>
          <div style={{ color: constants.color.secondary, fontWeight: 600 }}>
            CANDIDATOS
          </div>
          <Carousel
            interval={null}
            data-bs-theme="dark"
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            {candidatos.length === 0 ? (
              <Carousel.Item
                data-bs-theme="primary"
                style={{ color: constants.color.secondary }}
              >
                {loading ? "Carregando..." : "Não há candidatos a exibir."}
              </Carousel.Item>
            ) : (
              candidatos.map((obj, index) => (
                <Carousel.Item
                  data-bs-theme="primary"
                  key={"Candidato" + index}
                  style={{ color: constants.color.secondary }}
                >
                  <div
                    style={{
                      width: "calc(100% - 14rem)",
                    }}
                  >
                    <h3 style={{ textAlign: "center" }}>
                      {obj.tipo} {obj.nome}
                    </h3>
                    <p
                      style={{
                        backgroundColor: constants.color.white70,
                        borderRadius: "4px",
                        boxShadow: constants.shadow.md,
                        overflowY: "auto",
                        padding: "0.5rem",
                        fontSize: "14px",
                        height: "400px",
                        colorScheme: "auto",
                        textAlign: "justify",
                      }}
                    >
                      {obj.responsavel ? (
                        <>
                          <strong style={{ fontStyle: "italic" }}>
                            Responsáveis:
                          </strong>
                          <br />
                          {obj.responsavel}
                          <br />
                          <br />
                        </>
                      ) : (
                        <></>
                      )}
                      <strong style={{ fontStyle: "italic" }}>
                        Objetivos:
                      </strong>
                      <br />
                      {obj.descricao}
                      <br />
                    </p>
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
                      position: "absolute",
                      top: 0,
                      right: 0,
                      overflow: "hidden",
                    }}
                  >
                    {obj.foto ? (
                      <img
                        alt="candidato"
                        src={obj.foto}
                        style={{ width: "100%" }}
                      />
                    ) : (
                      <div
                        style={{
                          color: constants.color.white,
                          fontStyle: "italic",
                          fontWeight: 300,
                          textShadow: "2px 2px 2px #00000040",
                        }}
                      >
                        FOTO
                      </div>
                    )}
                  </div>
                </Carousel.Item>
              ))
            )}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default Dados;
