import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { TiDelete } from "react-icons/ti";

import * as constants from "../../constants";
import Button from "../../Componentes/ButtonSmall";
import FormSelecionaCandidatos from "./FormSelecionaCandidatos";
import { useState } from "react";
import UsePost from "../../../Back-end/HTTP/POST";
import { format } from "date-fns";
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
  const [candidatos, setCandidatos] = useState([]); //Atualizar com o array de candidatos da eleição.
  const [Tipo, setTipo] = useState(obj.cargo_disputa);
  const [Nome, setNome] = useState(obj.nome);
  const [Inicio, setInicio] = useState(obj.data_inicio);
  const [Fim, setFim] = useState(obj.data_fim);
  const [idCandidato, setIdCandidato] = useState();

  const handleTipo = (e) => {
    setTipo(e.target.value);
  };
  const handleNome = (e) => {
    setNome(e.target.value);
  };
  const handleInicio = (e) => {
    setInicio(format(e.target.value, "yyyy-MM-dd"));
  };
  const handleFim = (e) => {
    setFim(format(e.target.value, "yyyy-MM-dd"));
  };

  const handleAdicionar = () => {
    handlePostSubmit0()
      .then(() => {
        if(handleAdd) handleAdd({ nome: Nome, cargo_disputa: Tipo, data_fim: Fim, data_inicio: Inicio });
      });
  };

  const handleEditar = () => {
    handlePatchSubmit();
    for (let i = 0; i < candidatos.length; i++) {
      candidatos[0] = candidatos[i];
      setIdCandidato(candidatos[0].id_candidato);
      handlePostSubmit1()
        .then(() => {
          obj.nome = Nome;
          obj.cargo_disputa = Tipo;
          obj.data_inicio = Inicio;
          obj.data_fim = Fim;
          if(handleEdit) handleEdit(obj);
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
      ID_Candidato: idCandidato,
    },
    FORM_ENDPOINT:
      "https://gp-api-alpha.vercel.app/eleicao/adicionar_candidato",
  });

  const { handlePatchSubmit, pstatus, pmsg, pres } = UsePatch({
    Data: {
      Id_Eleica: obj.id_eleicao,
      Nome: Nome,
      Data_Inicio: Inicio,
      Data_Fim: Fim,
      Cargo_Disputa: Tipo,
    },
    FORM_ENDPOINT: "https://gp-api-alpha.vercel.app/eleicao/editar",
  });

  const handleRemoveCandidato = (index) => {
    // Crie uma cópia do array candidatos para não modificar o original diretamente
    let updateCandidato = [...candidatos];

    // Use o método splice para remover o item do array na posição do índice especificado
    updateCandidato.splice(index, 1);

    // Atualize o estado com o novo array
    setCandidatos(updateCandidato);
  };

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

  // atualiza o array de candidatos da eleicao
  // setCandidatos(searchEleicao(obj.id_eleicao));

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
                type="text"
                defaultValue={Nome}
                onChange={handleNome}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Tipo: </Form.Label>
              <Form.Control
                type="text"
                defaultValue={Tipo}
                onChange={handleTipo}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Início: </Form.Label>
              <Form.Control
                type="date"
                defaultValue={Inicio} // formatar para AAAA-MM-DD
                onChange={handleInicio}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Fim: </Form.Label>
              <Form.Control
                type="date"
                defaultValue={Fim} // formatar para AAAA-MM-DD
                onChange={handleFim}
              />
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
