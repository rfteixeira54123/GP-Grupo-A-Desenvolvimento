import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

import * as constants from "../../constants";
import Button from "../../Componentes/ButtonSmall";
import UsePost from "../../../Back-end/HTTP/POST";
import UsePatch from "../../../Back-end/HTTP/PATCH";

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
//  handleAdd: método para fechar o popup após adicionar.
//  handleEdit: método para fechar o popup após editar.
const FormC = ({ obj, handleCancelar, handleAdd, handleEdit }) => {
  const [Nome, setNome] = useState(obj.nome);
  const [Tipo, setTipo] = useState(obj.tipo);
  const [Imagem, setImagem] = useState("");
  const [Objetivos, setObjetivos] = useState(obj.descricao);
  const [flag, setFlag] = useState(true);
  const [valTipo, setvalTipo] = useState(false);
  const [valNome, setvalNome] = useState(false);
  const [valImagem, setvalImagem] = useState(false);
  const [valObjetivos, setvalObjetivos] = useState(false);

  useEffect(() => {
    if (flag) {
      console.log(obj);
      setNome(obj.nome);
      setTipo(obj.tipo);
      setObjetivos(obj.descricao);
      setImagem(obj.foto);
      setFlag(false);
    }
  });

  const handleNome = (e) => {
    setNome(e.target.value);
    setvalNome(!e.target.value);
  };
  const handleTipo = (e) => {
    setTipo(e.target.value);
    setvalTipo(!e.target.value);
  };
  const handleImagem = (e) => {
    setImagem(e.target.value);
    setvalImagem(!e.target.value);
  };
  const handleObjetivos = (e) => {
    setObjetivos(e.target.value);
    setvalObjetivos(!e.target.value);
  };

  const verifyFields = () => {
    setvalNome(!Nome);
    setvalTipo(!Tipo);
    setvalImagem(!Imagem);
    setvalObjetivos(!Objetivos);
    // console.log(Nome+" "+Tipo+" "+Imagem+" "+Objetivos);
  };

  const handleAdicionar = () => {
    verifyFields();
    if (Nome && Tipo && Imagem && Objetivos) {
      setStatePopup(10);
      handlePostSubmit().then(() => {
        if (handleAdd)
          handleAdd({
            nome: Nome,
            tipo: Tipo,
            foto: Imagem,
            descricao: Objetivos,
          });
      });
    }
  };

  const handleEditar = () => {
    verifyFields();
    if (Nome && Tipo && Imagem && Objetivos) {
      setStatePopup(10);
      handlePatchSubmit().then(() => {
        obj.nome = Nome;
        obj.tipo = Tipo;
        obj.descricao = Objetivos;
        obj.foto = Imagem;
        if (handleEdit) handleEdit(obj);
      });
    }
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

  const [statePopup, setStatePopup] = useState(0);

  const decidePopup = () => {
    switch (statePopup) {
      case 10:
        return <Spinner animation="border" />;
      default:
        return <></>;
    }
  };

  const stylePopUp = {
    display: statePopup === 0 ? "none" : "flex",
    backgroundColor: constants.color.white70,
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={styleContainer}>
      <div style={styleTop}>
        {obj.id_candidato ? "Editar" : "Adicionar"} candidato
      </div>
      <Form
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
            defaultValue={Nome}
            onChange={handleNome}
            isInvalid={valNome}
          />
          <Form.Control.Feedback type="invalid">
            O campo deve ser preenchido.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tipo: </Form.Label>
          <Form.Control
            type="text"
            defaultValue={Tipo}
            onChange={handleTipo}
            isInvalid={valTipo}
          />
          <Form.Control.Feedback type="invalid">
            O campo deve ser preenchido.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Foto: </Form.Label>
          <Form.Control
            type="file"
            defaultValue={Imagem}
            onChange={handleImagem}
            isInvalid={valImagem}
          />
          <Form.Control.Feedback type="invalid">
            O campo deve ser preenchido.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Objetivos: </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            defaultValue={Objetivos}
            onChange={handleObjetivos}
            isInvalid={valObjetivos}
          />
          <Form.Control.Feedback type="invalid">
            O campo deve ser preenchido.
          </Form.Control.Feedback>
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
      <div style={stylePopUp}>{decidePopup()}</div>
    </div>
  );
};

FormC.defaultProps = {
  obj: { nome: "", descricao: "", tipo: "", foto: "" },
};

export default FormC;
