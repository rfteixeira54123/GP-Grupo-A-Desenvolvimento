import { useState } from "react";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

import * as constants from "../../constants";
import Button from "../../Componentes/ButtonSmall";
import usePost from "../../../Back-end/HTTP/POST";
import usePatch from "../../../Back-end/HTTP/PATCH";

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
  const [Num, setNum] = useState(obj.numero_id);
  const [Email, setEmail] = useState(obj.email);
  const [Estado, setEstado] = useState(obj.estado);
  // const [flag, setFlag] = useState(true);
  const [valNome, setvalNome] = useState(false);
  const [valNum, setvalNum] = useState(false);
  const [valEmail, setvalEmail] = useState(false);

  const { handlePatchSubmit } = usePatch({
    Data: {
      ID_Conta: obj.id_conta,
      Email: Email,
      Identificacao: Num,
    },
    FORM_ENDPOINT: "https://gp-api-alpha.vercel.app/conta/editar",
  });

  //NÃO USAR PALIZE
  const { handlePostSubmit } = usePost({
    Data: {
      Email: Email,
      Nome: Nome,
      TipoConta: Tipo,
      Identificacao: Num,
    },
    FORM_ENDPOINT: "https://gp-api-alpha.vercel.app/conta/inserir",
  });

  const handleNome = (e) => {
    setNome(e.target.value);
    setvalNome(!e.target.value);
  };
  const handleTipo = (e) => {
    setTipo(e.target.value);
  };
  const handleEstado = (e) => {
    setEstado(e.target.value);
  };
  const handleNum = (e) => {
    setNum(e.target.value);
    setvalNum(!e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setvalEmail(!e.target.value);
  };

  const verifyFields = () => {
    setvalNome(Nome.length < 8);
    setvalEmail(Email.length < 8);
    setvalNum(!Num);
  };

  const handleAdicionar = () => {
    verifyFields();
    if (Nome && Nome.length > 7 && Tipo && Num && Email && Email.length > 7) {
      setStatePopup(10);
      handlePostSubmit().then(() => {
        if (handleAdd) handleAdd();
      });
    }
  };

  const handleEditar = () => {
    console.log("editar");
    verifyFields();
    if (Num && Email && Email.length > 7) {
      setStatePopup(10);
      handlePatchSubmit().then(() => {
        obj.numero_id = Num;
        obj.email = Email;
        if (handleEdit) handleEdit(obj);
      });
    }
  };

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
      <div style={styleTop}>{obj.id_conta ? "Editar" : "Adicionar"} conta</div>
      <Form
        style={{
          marginTop: "1rem",
          color: constants.color.secondary,
          fontSize: "14px",
        }}
      >
        {obj.id_conta ? (
          <Form.Group className="mb-3">
            <Form.Label>Estado: </Form.Label>
            <Form.Select
              defaultValue={Estado}
              onChange={handleEstado}
              disabled={true}
            >
              <option value={true}>Ativo</option>
              <option value={false}>Inativo</option>
            </Form.Select>
          </Form.Group>
        ) : (
          <Form.Group className="mb-3">
            <Form.Label>Tipo: </Form.Label>
            <Form.Select defaultValue={Tipo} onChange={handleTipo}>
              <option value="Eleitor">Eleitor</option>
              <option value="Administrador">Administrador</option>
            </Form.Select>
          </Form.Group>
        )}
        <Form.Group className="mb-3">
          <Form.Label>Nome: </Form.Label>
          <Form.Control
            type="text"
            defaultValue={Nome}
            onChange={handleNome}
            isInvalid={valNome}
            disabled={obj.id_conta ? true : false}
          />
          <Form.Control.Feedback type="invalid">
            O nome deve conter no mínimo 8 caracteres.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nº de ID: </Form.Label>
          <Form.Control
            type="number"
            defaultValue={Num}
            onChange={handleNum}
            isInvalid={valNum}
          />
          <Form.Control.Feedback type="invalid">
            O campo deve ser preenchido.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email: </Form.Label>
          <Form.Control
            type="email"
            defaultValue={Email}
            onChange={handleEmail}
            isInvalid={valEmail}
          />
          <Form.Control.Feedback type="invalid">
            O email deve conter no mínimo 8 caracteres.
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
          label={obj.id_conta ? "Editar" : "Adicionar"}
          handle={obj.id_conta ? handleEditar : handleAdicionar}
        />
      </div>
      <div style={stylePopUp}>{decidePopup()}</div>
    </div>
  );
};

FormC.defaultProps = {
  obj: { nome: "", numero_id: "", email: "", estado: false, tipo: "Eleitor" },
};

export default FormC;
