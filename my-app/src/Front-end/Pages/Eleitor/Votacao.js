import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import * as constants from "../../constants";
import Logo from "../../Imagens/Full_Blue_Icon.png";
import ListaCandidatos from "../../Componentes/ListaCandidatos";
import Popup from "../../Componentes/PopupConfirma";
import PopupFinaliza from "../../Componentes/PopupFinaliza";
import { useEffect } from "react";
import useGet from "../../../Back-end/HTTP/GET";
import usePost from "../../../Back-end/HTTP/POST";

const styleWindow = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  width: "100%",
  minWidth: "fit-content",
  height: "100vh",
  padding: "1.5rem",
};

const styleTitle = {
  color: constants.color.secondary,
  fontSize: "24px",
  letterSpacing: 0,
  fontWeight: 600,
  lineHeight: "normal",
  textShadow: constants.shadow.md,
  textAlign: "center",
  marginBlock: "1rem",
  textTransform: "uppercase",
};

const Window = () => {
  let [state, setState] = useState(0);
  let [obj, setObj] = useState("");
  const [flag, setFlag] = useState(true);
  const [candidatos, setCandidatos] = useState([]);

  const location = useLocation();
  let eleicao = location.state && location.state.eleicao;
  const id = location.state && location.state.id;

  const [evitaErro, setEvitaErro] = useState(eleicao ? false : true);
  const navigate = useNavigate();
  if (!eleicao) {
    eleicao = { nome: "", cargo_disputa: "" };
  }

  const { handleGetSubmit, status, message, res } = useGet({
    FORM_ENDPOINT:
      "https://gp-api-alpha.vercel.app/eleicao" + id + "/listar_candidatos",
  });

  useEffect(() => {
    if (evitaErro) {
      console.log("Não encaminhado corretamente.");
      navigate("home");
      setFlag(false);
    }
    if (flag) {
      handleGetSubmit();
      setFlag(false);
    }
  });

  useEffect(() => {
    if (res && res.Candidatos && Array.isArray(res.Candidatos)) {
      const candidatoList = res.Candidatos.map((candidato) => ({
        id_candidato: candidato.id_candidato,
        nome: candidato.nome,
        tipo: candidato.tipo,
      }));
      setCandidatos(candidatoList);
    }
  }, [res]);

  function handleState(page, choice) {
    if (choice && choice.id_candidato) {
      setObj(choice);
    } else {
      setObj({ id_candidato: null });
    }
    
    if (page == 2) {
      if (obj.id_candidato) {
        console.log("vota em alguem");
        console.table(obj);
        handlePostSubmit().then(() => setState(page));
      } else {
        console.log("voto em branco");
        console.table(obj);
        handlePostSubmitBlank().then(() => setState(page));
      }
    } else{
      setState(page);
    }
  }

  const { handlePostSubmit } = usePost({
    Data: {
      ID_Eleicao: id,
      ID_Candidato: obj.id_candidato,
    },
    FORM_ENDPOINT: "https://gp-api-alpha.vercel.app/eleicao/votar",
  });

  const { handlePostSubmit: handlePostSubmitBlank } = usePost({
    Data: {
      ID_Eleicao: id,
    },
    FORM_ENDPOINT: "https://gp-api-alpha.vercel.app/eleicao/votar",
  });

  const defineContent = () => {
    switch (state) {
      default:
        return (
          <>
            <div style={styleWindow}>Hello World!</div>
          </>
        );
      case 0:
        return (
          <ListaCandidatos
            array={candidatos}
            OnHandleBtn={handleState}
            selected={[candidatos.findIndex((item) => item === obj)]}
          />
        );

      case 1:
        return <Popup OnHandleBtn={handleState} choice={obj} />;
      case 2:
        return <PopupFinaliza />;
    }
  };

  return (
    <div style={styleWindow}>
      <img
        style={{
          width: "9rem",
          padding: "1rem 0 0 2rem",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        src={Logo}
        alt="logo"
      />
      <div style={styleTitle}>
        ELEIÇÕES DE {eleicao.cargo_disputa} - {eleicao.nome}
      </div>
      {defineContent()}
    </div>
  );
};

export default Window;
