import Form from "react-bootstrap/Form";

import * as constants from "../../constants";
import Button from "../../Componentes/ButtonSmall";
import { useState } from "react";
import UsePost from "../../../Back-end/HTTP/POST";
import UsePatch from "../../../Back-end/HTTP/PATCH";
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
//  obj: candidato a editar (opcional) se for pra editar tem id_candidato
//  handleCancelar: método para fechar o popup
const FormC = ({ obj, handleCancelar }) => {
  const [Nome, setNome] = useState("");
  const [Tipo, setTipo] = useState("");
  const [Imagem, setImagem] = useState("");
  const [Objetivos, setObjetivos] = useState("");
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    if (flag) {
      setNome(obj.nome);
      setTipo(obj.tipo);
      setFlag(false);
    }
  });

  const handleNome = (e) => {
    setNome(e.target.value);
  };

  const handleTipo = (e) => {
    setTipo(e.target.value);
  };

  const handleImagem = (e) => {
    setImagem(e.target.value);
  };

  const handleObjetivos = (e) => {
    setObjetivos(e.target.value);
  };

  const handleAdicionar = () => {
    handlePostSubmit();
  };

  const handleEditar = () => {
    handlePatchSubmit();
  };

  const { handlePostSubmit, status, msg, res } = UsePost({
    Data: {
      Nome: Nome,
      Tipo: Tipo,
      Objetivo: Objetivos,
      Link_Imagem: Imagem,
    },
    FORM_ENDPOINT: "https://gp-api-alpha.vercel.app/candidato/inserir",
  });

  const { handlePatchSubmit, pstatus, pmsg, pres } = UsePatch({
    Data: {
      ID_Candidato: obj.id_candidato,
      Nome: Nome,
      Tipo: Tipo,
      Objetivo: Objetivos,
      Link_Imagem: Imagem,
    },
    FORM_ENDPOINT: "https://gp-api-alpha.vercel.app/candidato/editar",
  });

  return (
    <div style={styleContainer}>
      <div style={styleTop}>
        {obj.id_candidato ? "Editar" : "Adicionar"} candidato
      </div>
      <Form
        variant="warning"
        style={{
          marginTop: "1rem",
          color: constants.color.secondary,
          fontSize: "14px",
        }}
      >
        <Form.Group className="mb-3">
          <Form.Label>Nome: </Form.Label>
          <Form.Control
            type="text"
            // defaultValue={obj.nome}
            defaultValue={Nome}
            onChange={handleNome}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tipo: </Form.Label>
          <Form.Control
            type="text"
            // defaultValue={obj.tipo}
            defaultValue={Tipo}
            onChange={handleTipo}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Foto: </Form.Label>
          <Form.Control
            type="file"
            // defaultValue={obj.foto}
            defaultValue={Imagem}
            onChange={handleImagem}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Objetivos: </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            // defaultValue={obj.descricao}
            defaultValue={Objetivos}
            onChange={handleObjetivos}
          />
        </Form.Group>
      </Form>
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
          label={obj.id_candidato ? "Editar" : "Adicionar"}
          handle={obj.id_candidato ? handleEditar : handleAdicionar}
        />
      </div>
    </div>
  );
};

FormC.defaultProps = {
  obj: { nome: "", descricao: "", tipo: "", foto: "" },
};

export default FormC;
