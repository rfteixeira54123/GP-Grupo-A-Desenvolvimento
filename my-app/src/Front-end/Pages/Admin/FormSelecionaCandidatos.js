import { useState } from "react";
import Form from "react-bootstrap/Form";

import * as constants from "../../constants";
import Button from "../../Componentes/ButtonSmall";
import Table from "../../Componentes/TableMini";
import UseGet from "../../../Back-end/HTTP/GET";
import { useEffect } from "react";

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
  height: "96%",
  overflowY: "auto",
  maxWidth: "50rem",
  minWidth: "fit-content",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBlock: "1rem",
};

// Recebe:
//  selecionados: array de ids dos candidatos selecionados
//  handleCancelar: método para fechar o popup
//  handleAdicionar: método para atualizar os candidatos selecionados
const FormC = ({ selecionados, handleCancelar, handleAdicionar }) => {
  const [choices, setChoices] = useState(selecionados);
  const [flag, setFlag] = useState(true);

  const [candidatos, setCandidatos] = useState([]);
  const { handleGetSubmit, status, message, res } = UseGet({
    FORM_ENDPOINT: "https://gp-api-alpha.vercel.app/candidato/listar",
  });

  useEffect(() => {
    if (flag) {
      handleGetSubmit();
      setFlag(false);
    }
  });

  useEffect(() => {
    if (res && res.Candidatos && Array.isArray(res.Candidatos)) {
      const candidatoList = res.Candidatos.filter(
        (candidato) => candidato.id_eleicao === null
      ).map((candidato) => ({
        id_candidato: candidato.id_candidato,
        nome: candidato.nome,
        tipo: candidato.tipo,
      }));
      setCandidatos(candidatoList);
    }
  }, [res]);

  const updateCandidatos = (array) => {
    setChoices(array);
  };

  return (
    <div style={styleContainer}>
      <div style={styleTop}>Adicionar candidatos a eleição</div>
      <Form
        variant="danger"
        style={{
          marginTop: "1rem",
          color: constants.color.secondary,
          fontSize: "14px",
        }}
      >
        <Form.Group
          className="mb-3"
          style={{ display: "flex", gap: "1rem", alignItems: "flex-end" }}
        >
          <Form.Label>Tipo: </Form.Label>
          <Form.Select disabled={true}>
            <option value="1">Lista</option>
            <option value="2">Presidente</option>
            <option value="3">Diretor</option>
          </Form.Select>
        </Form.Group>
      </Form>
      <div style={{ height: "100%", overflowY: "auto" }}>
        <Table
          candidatos={candidatos}
          selecionados={selecionados.map((candidato) => candidato.id_candidato)}
          handleCheckboxChange={updateCandidatos}
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
        <Button
          label={"Concluir"}
          handle={() => {
            handleAdicionar(choices);
            handleCancelar();
          }}
        />
      </div>
    </div>
  );
};

FormC.defaultProps = {};

export default FormC;
