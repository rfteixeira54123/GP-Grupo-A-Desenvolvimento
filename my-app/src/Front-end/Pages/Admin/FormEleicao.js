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
const FormC = ({ obj, handleCancelar }) => {
  //Fazer get para buscar candidatos da eleição.
  const [candidatos, setCandidatos] = useState([]); //Atualizar com o array de candidatos da eleição.

  const [Tipo, setTipo] = useState(obj.cargo_disputa);
  const [Nome, setNome] = useState(obj.nome);
  const [Inicio, setInicio] = useState(obj.data_inicio);
  const [Fim, setFim] = useState(obj.data_fim);

  const handleTipo = (e) => {
    setTipo(e.target.value);
  };
  const handleNome = (e) => {
    setNome(e.target.value);
  };
  const handleInicio = (e) => {
    setInicio(e.target.value);
  };
  const handleFim = (e) => {
    setFim(e.target.value);
  };

  const handleAdicionar = () => {
    console.log("Insere Eleicao");
    handlePostSubmit();
  };

  const { handlePostSubmit, status, msg, res } = UsePost({
    Data: {
      Nome: Nome,
      Tipo: Tipo,
      Data_Inicio: Inicio,
      Data_Fim: Fim,
    },
    FORM_ENDPOINT: "https://gp-api-alpha.vercel.app/eleicao/inserir",
  });

  const handleEditar = () => {
    //Fazer função para editar eleicao
    console.log("editar");
  };

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
      <div style={{ ...styleContainer, maxWidth: "40rem", overflowY: "hidden" }}>
        <div style={styleTopInside}>Candidatos</div>
        <div style={styleContainerInside}>
          <ul style={styleUL}>
            {candidatos.map((obj, index) => (
              <li key={"candidato" + index}>
                <div style={styleLI}>
                  <div>{obj.nome}</div>
                  <TiDelete title="Remover candidato" color={constants.color.red_light} 
                  size={30} onClick={() => handleRemoveCandidato(index)}/>
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
