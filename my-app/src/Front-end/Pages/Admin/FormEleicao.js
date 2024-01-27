import { useEffect, useState } from "react";
import { format } from "date-fns";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { TiDelete } from "react-icons/ti";
import Spinner from "react-bootstrap/Spinner";

import * as constants from "../../constants";
import Button from "../../Componentes/ButtonSmall";
import FormSelecionaCandidatos from "./FormSelecionaCandidatos";
import UsePost from "../../../Back-end/HTTP/POST";
import UsePatch from "../../../Back-end/HTTP/PATCH";
import Candidato from "../../../Back-end/Objetos/ClassCandidato";
import useGet from "../../../Back-end/HTTP/GET";
import useDelete from "../../../Back-end/HTTP/DELETE";

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
  height: "90%",
  width: "80%",
  maxWidth: "50rem",
  minWidth: "fit-content",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBlock: "1rem",
};

const styleBtnsForm = {
  display: "flex",
  gap: "4rem",
  marginBlock: "1rem",
  marginInline: "2rem",
};

const styleTopInside = {
  ...styleTop,
  fontWeight: 600,
  paddingBlock: "4px",
  fontSize: "15px",
};

const styleContainerInside = {
  height: "100%",
  overflowY: "auto",
  width: "100%",
  paddingTop: "0.5rem",
};

const styleUL = {
  // height: "calc(100% - 4rem)",
  // minHeight: "fit-content",
  width: "max-content",
  paddingInline: "3rem",
  color: constants.color.secondary,
  fontWeight: 500,
};

const styleLI = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "row",
  gap: "1rem",
};

const styleBtnFloat = {
  position: "absolute",
  bottom: "15px",
  right: "15px",
  paddingInline: "15px",
  direction: "rtl",
  width: "inherit",
};

// Recebe:
//  obj: eleicao a editar (opcional) se for pra editar tem id_eleicao
//  handleCancelar: método para fechar o popup
//  handleAdd: método para fechar o popup após adicionar.
//  handleEdit: método para fechar o popup após editar.
const FormC = ({ obj, handleCancelar, handleAdd, handleEdit }) => {
  //Fazer get para buscar candidatos da eleição.
  const [candidatos, setCandidatos] = useState([]);
  const [deleteCandidatos, setDeleteCandidatos] = useState([]);
  const [Tipo, setTipo] = useState(obj.cargo_disputa);
  const [Nome, setNome] = useState(obj.nome);
  const [Inicio, setInicio] = useState(
    obj.id_eleicao ? format(obj.data_inicio, "yyyy-MM-dd") : obj.data_inicio
  );
  const [Fim, setFim] = useState(
    obj.id_eleicao ? format(obj.data_fim, "yyyy-MM-dd") : obj.data_fim
  );
  const [valTipo, setvalTipo] = useState(false);
  const [valNome, setvalNome] = useState(false);
  const [valInicio, setvalInicio] = useState(false);
  const [valFim, setvalFim] = useState(false);
  const [flag, setFlag] = useState(true);

  const handleTipo = (e) => {
    setTipo(e.target.value);
    setvalTipo(!e.target.value);
  };
  const handleNome = (e) => {
    setNome(e.target.value);
    setvalNome(!e.target.value);
  };
  const handleInicio = (e) => {
    setInicio(format(e.target.value, "yyyy-MM-dd"));
    setvalInicio(!e.target.value);
  };
  const handleFim = (e) => {
    setFim(format(e.target.value, "yyyy-MM-dd"));
    setvalFim(!e.target.value);
  };

  const verifyFields = () => {
    setvalNome(Nome.length < 5);
    setvalTipo(Tipo.length < 2);
    setvalInicio(!Inicio);
    setvalFim(Fim < Inicio);
  };

  const handleAdicionar = () => {
    verifyFields();
    if (
      Nome &&
      Nome.length > 4 &&
      Tipo &&
      Tipo.length > 1 &&
      Inicio &&
      Fim &&
      Fim >= Inicio
    ) {
      console.log("adicionar");
      setStatePopup(10);
      handlePostSubmit0().then(() => {
        if (handleAdd)
          handleAdd({
            nome: Nome,
            cargo_disputa: Tipo,
            data_fim: Fim,
            data_inicio: Inicio,
          });
      });
    }
  };

  const handleEditar = () => {
    verifyFields();
    if (
      Nome &&
      Nome.length > 4 &&
      Tipo &&
      Tipo.length > 1 &&
      Inicio &&
      Fim &&
      Fim >= Inicio
    ) {
      setStatePopup(10);
      handlePatchSubmit().then(() => {
        handlePostSubmit1().then(() => {
          obj.nome = Nome;
          obj.cargo_disputa = Tipo;
          obj.data_inicio = Inicio;
          obj.data_fim = Fim;
          try {
            localStorage.removeItem("delete");
          } catch {}
          if (handleEdit) handleEdit(obj);
        });
      });
    }
  };

  const {
    handlePostSubmit: handlePostSubmit0,
    status,
    msg,
    res,
  } = UsePost({
    Data: {
      Nome: Nome,
      Data_Inicio: Inicio,
      Data_Fim: Fim,
      Cargo_Disputa: Tipo,
    },
    FORM_ENDPOINT: "https://gp-api-alpha.vercel.app/eleicao/inserir",
  });

  const {
    handlePostSubmit: handlePostSubmit1,
    pcstatus,
    pcmsg,
    pcres,
  } = UsePost({
    Data: {
      ID_Eleicao: obj.id_eleicao,
      ID_Candidatos: candidatos.map((candidato) => candidato.id_candidato),
    },
    FORM_ENDPOINT:
      "https://gp-api-alpha.vercel.app/eleicao/adicionar_candidatos",
  });

  const { handlePatchSubmit, pstatus, pmsg, pres } = UsePatch({
    Data: {
      ID_Eleicao: obj.id_eleicao,
      Nome: Nome,
      Data_Inicio: Inicio,
      Data_Fim: Fim,
      Cargo_Disputa: Tipo,
    },
    FORM_ENDPOINT: "https://gp-api-alpha.vercel.app/eleicao/editar",
  });

  const {
    handleGetSubmit,
    gstatus,
    message,
    res: gres,
  } = useGet({
    FORM_ENDPOINT:
      "https://gp-api-alpha.vercel.app/eleicao" +
      obj.id_eleicao +
      "/listar_candidatos",
  });

  useEffect(() => {
    if (flag) {
      handleGetSubmit();
      setFlag(false);
    }
  });

  useEffect(() => {
    try {
      console.log(gres);
      if (gres && gres.Candidatos && Array.isArray(gres.Candidatos)) {
        const candidatoList = gres.Candidatos.map((candidato) => ({
          id_candidato: candidato.id_candidato,
          nome: candidato.nome,
          tipo: candidato.tipo,
          descricao: candidato.objetivo,
          foto: candidato.link_imagem,
        }));
        setCandidatos(candidatoList);
      }
    } catch (e) {
      console.error(e);
    }
  }, [gres]);

  ///eleicao1/listar_candidatos

  //NOTAS :
  // não sei se é do servidor ser lento, mas é preciso esperar um pouco para utilizar esta função (2~3 segundos)
  const handleRemoveCandidato = (index) => {
    // Crie uma cópia do array candidatos para não modificar o original diretamente
    let updateCandidato = [...candidatos];
    let removeCandidatos = [...deleteCandidatos];

    // Use o método splice para remover o item do array na posição do índice especificado
    updateCandidato.splice(index, 1);
    // Atualize o estado com o novo array
    setCandidatos(updateCandidato);

    localStorage.setItem("delete", candidatos[index].id_candidato);
    handleDeleteSubmit();
  };

  const { handleDeleteSubmit } = useDelete({
    Data: {
      ID_Eleicao: obj.id_eleicao,
      ID_Candidatos: [localStorage.getItem("delete")].map(Number),
    },
    FORM_ENDPOINT:
      "https://gp-api-alpha.vercel.app/eleicao/desassociar_candidatos",
  });

  const handleAdicionarCandidato = (choices) => {
    //Fazer função para adicionar candidato
    // console.table(choices);
    setCandidatos(choices);
  };

  const [statePopup, setStatePopup] = useState(0);

  const decidePopup = () => {
    switch (statePopup) {
      case 1:
        return (
          <FormSelecionaCandidatos
            selecionados={candidatos}
            handleCancelar={() => setStatePopup(0)}
            handleAdicionar={handleAdicionarCandidato}
          />
        );
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
        {obj.id_eleicao ? "Editar" : "Adicionar"} eleição
      </div>
      <Form
        style={{
          marginTop: "1rem",
          color: constants.color.secondary,
          fontSize: "14px",
        }}
      >
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Nome: </Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={Nome}
                onChange={handleNome}
                isInvalid={valNome}
              />
              <Form.Control.Feedback type="invalid">
                O nome deve conter no mínimo 5 caracteres.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Tipo: </Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={Tipo}
                onChange={handleTipo}
                isInvalid={valTipo}
              />
              <Form.Control.Feedback type="invalid">
                O tipo deve conter no mínimo 2 caracteres.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Início: </Form.Label>
              <Form.Control
                required
                type="date"
                defaultValue={Inicio} // formatar para AAAA-MM-DD
                onChange={handleInicio}
                isInvalid={valInicio}
              />
              <Form.Control.Feedback type="invalid">
                O campo deve ser preenchido.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Fim: </Form.Label>
              <Form.Control
                required
                type="date"
                defaultValue={Fim} // formatar para AAAA-MM-DD
                onChange={handleFim}
                isInvalid={valFim}
              />
              <Form.Control.Feedback type="invalid">
                A data final de ser maior que a data inicial.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <div
        style={{ ...styleContainer, maxWidth: "40rem", overflowY: "hidden" }}
      >
        <div style={styleTopInside}>Candidatos</div>
        <div style={styleContainerInside}>
          <ul style={styleUL}>
            {candidatos.map((obj, index) => (
              <li key={"candidato" + index}>
                <div style={styleLI}>
                  <div>{obj.nome}</div>
                  <TiDelete
                    title="Remover candidato"
                    color={constants.color.red_light}
                    size={30}
                    onClick={() => handleRemoveCandidato(index)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div style={styleBtnFloat}>
          <Button
            label="Adicionar Candidatos"
            handle={() => setStatePopup(1)}
          />
        </div>
      </div>
      <div style={styleBtnsForm}>
        <Button label="Cancelar" handle={handleCancelar} />
        <Button
          label={obj.id_eleicao ? "Editar" : "Adicionar"}
          handle={obj.id_eleicao ? handleEditar : handleAdicionar}
        />
      </div>
      <div style={stylePopUp}>{decidePopup()}</div>
    </div>
  );
};

FormC.defaultProps = {
  obj: { nome: "", cargo_disputa: "", data_fim: "", data_inicio: "" },
};

export default FormC;
