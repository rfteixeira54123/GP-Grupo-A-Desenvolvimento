import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { TiDelete } from "react-icons/ti";

import * as constants from "../../constants";
import Button from "../../Componentes/ButtonSmall";
import FormSelecionaCandidatos from "./FormSelecionaCandidatos";
import { useState } from "react";

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

// Recebe:
//  obj: eleicao a editar (opcional) se for pra editar tem id_eleicao
//  handleCancelar: método para fechar o popup
const FormC = ({ obj, handleCancelar }) => {
  //Fazer get para buscar candidatos da eleição.
  const [candidatos, setCandidatos] = useState([
    {
      id_candidato: 0,
      nome: "Nome do Candidato",
      tipo: "Lista",
      descricao:
        "magnis dis parturient montes, nascetur ridiculus mus. Donecquam felis, ultricies nec, pellentesque eu, pretium quis, sem.Nulla consequat massa quis enim. Donec pede justo, fringillavel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncusut, imperdiet a, venenatis vitae, justo. Nullam dictum feliseu pede mollis pretium. Integer tincidunt. Cras dapibus.Vivamus elementum semper nisi. Aenean vulputate eleifend magnis dis parturient montes, nascetur ridiculus mus. Donecquam felis, ultricies nec, pellentesque eu, pretium quis, sem.Nulla consequat massa quis enim. Donec pede justo, fringillavel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncusut, imperdiet a, venenatis vitae, justo. Nullam dictum feliseu pede mollis pretium. Integer tincidunt. Cras dapibus.Vivamus elementum semper nisi. Aenean vulputate eleifend magnis dis parturient montes, nascetur ridiculus mus. Donecquam felis, ultricies nec, pellentesque eu, pretium quis, sem.Nulla consequat massa quis enim. Donec pede justo, fringillavel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncusut, imperdiet a, venenatis vitae, justo. Nullam dictum feliseu pede mollis pretium. Integer tincidunt. Cras dapibus.Vivamus elementum semper nisi. Aenean vulputate eleifend magnis dis parturient montes, nascetur ridiculus mus. Donecquam felis, ultricies nec, pellentesque eu, pretium quis, sem.Nulla consequat massa quis enim. Donec pede justo, fringillavel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncusut, imperdiet a, venenatis vitae, justo. Nullam dictum feliseu pede mollis pretium. Integer tincidunt. Cras dapibus.Vivamus elementum semper nisi. Aenean vulputate eleifend magnis dis parturient montes, nascetur ridiculus mus. Donecquam felis, ultricies nec, pellentesque eu, pretium quis, sem.Nulla consequat massa quis enim. Donec pede justo, fringillavel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncusut, imperdiet a, venenatis vitae, justo. Nullam dictum feliseu pede mollis pretium. Integer tincidunt. Cras dapibus.Vivamus elementum semper nisi. Aenean vulputate eleifend magnis dis parturient montes, nascetur ridiculus mus. Donecquam felis, ultricies nec, pellentesque eu, pretium quis, sem.Nulla consequat massa quis enim. Donec pede justo, fringillavel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncusut, imperdiet a, venenatis vitae, justo. Nullam dictum feliseu pede mollis pretium. Integer tincidunt. Cras dapibus.Vivamus elementum semper nisi. Aenean vulputate eleifendmagnis dis parturient montes, nascetur ridiculus mus. Donecquam felis, ultricies nec, pellentesque eu, pretium quis, sem.Nulla consequat massa quis enim. Donec pede justo, fringillavel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncusut, imperdiet a, venenatis vitae, justo. Nullam dictum feliseu pede mollis pretium. Integer tincidunt. Cras dapibus.Vivamus elementum semper nisi. Aenean vulputate eleifend ",
    },
    { id_candidato: 4, nome: "Nome do Candidato4", tipo: "Diretor" },
  ]);

  const handleAdicionar = () => {
    //Fazer função para adicionar eleicao
    console.log("adicionar");
  };

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
    console.log("adicionar");
    console.table(choices);
    setCandidatos(choices);
  };

  const [statePopup, setStatePopup] = useState(0);

  const decidePopup = () => {
    switch (statePopup) {
      case 1:
        return <FormSelecionaCandidatos selecionados={candidatos} handleCancelar={() => setStatePopup(0)} handleAdicionar={handleAdicionarCandidato}/>;
      default:
        return <></>;
    }
  };



  // atualiza o array de candidatos da eleicao
  // setCandidatos(searchEleicao(obj.id_eleicao));

  return (
    <div style={styleContainer}>
      <div style={styleTop}>
        {obj.id_eleicao ? "Editar" : "Adicionar"} eleição
      </div>
      <Form style={{ marginTop: "1rem", color: constants.color.secondary, fontSize: "14px", }}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Nome: </Form.Label>
              <Form.Control type="text" defaultValue={obj.nome} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Tipo: </Form.Label>
              <Form.Control type="text" defaultValue={obj.cargo_disputa} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Início: </Form.Label>
              <Form.Control
                type="datetime-local"
                defaultValue={obj.data_inicio}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Fim: </Form.Label>
              <Form.Control type="datetime-local" defaultValue={obj.data_fim} />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <div style={{ ...styleContainer, maxWidth: "40rem", overflowY: "hidden" }} >
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
        <div style={{ position: "absolute", bottom: "15px", right: "15px", 
        paddingInline: "15px", direction: "rtl", width: "inherit" }}>
          <Button label="Adicionar Candidatos" handle={() => setStatePopup(1)} />
        </div>
      </div>
      <div style={styleBtnsForm}>
        <Button label="Cancelar" handle={handleCancelar} />
        <Button
          label={obj.id_eleicao ? "Editar" : "Adicionar"}
          handle={obj.id_eleicao ? handleEditar : handleAdicionar}
        />
      </div>
      <div
        style={{
          display: statePopup === 0 ? "none" : "flex",
          backgroundColor: constants.color.white70,
          position: "absolute",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {decidePopup(statePopup)}
      </div>
    </div>
  );
};

FormC.defaultProps = {
  obj: { nome: "", cargo_disputa: "", data_fim: "", data_inicio: "" },
};

export default FormC;
