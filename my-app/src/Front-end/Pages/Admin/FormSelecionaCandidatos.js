import { useState } from "react";
import Form from "react-bootstrap/Form";

import * as constants from "../../constants";
import Button from "../../Componentes/ButtonSmall";
import Table from "../../Componentes/TableMini";

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
const FormC = ({ selecionados, handleCancelar, handleAdicionar }) => {
  // Fazer GET candidatos da aplicação com base no tipo
  const [candidatos, setCandidatos] = useState([
    {
      id_candidato: 0,
      nome: "Nome do Candidato",
      tipo: "Lista",
      descricao:
        "magnis dis parturient montes, nascetur ridiculus mus. Donecquam felis, ultricies nec, pellentesque eu, pretium quis, sem.Nulla consequat massa quis enim. Donec pede justo, fringillavel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncusut, imperdiet a, venenatis vitae, justo. Nullam dictum feliseu pede mollis pretium. Integer tincidunt. Cras dapibus.Vivamus elementum semper nisi. Aenean vulputate eleifend magnis dis parturient montes, nascetur ridiculus mus. Donecquam felis, ultricies nec, pellentesque eu, pretium quis, sem.Nulla consequat massa quis enim. Donec pede justo, fringillavel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncusut, imperdiet a, venenatis vitae, justo. Nullam dictum feliseu pede mollis pretium. Integer tincidunt. Cras dapibus.Vivamus elementum semper nisi. Aenean vulputate eleifend magnis dis parturient montes, nascetur ridiculus mus. Donecquam felis, ultricies nec, pellentesque eu, pretium quis, sem.Nulla consequat massa quis enim. Donec pede justo, fringillavel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncusut, imperdiet a, venenatis vitae, justo. Nullam dictum feliseu pede mollis pretium. Integer tincidunt. Cras dapibus.Vivamus elementum semper nisi. Aenean vulputate eleifend magnis dis parturient montes, nascetur ridiculus mus. Donecquam felis, ultricies nec, pellentesque eu, pretium quis, sem.Nulla consequat massa quis enim. Donec pede justo, fringillavel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncusut, imperdiet a, venenatis vitae, justo. Nullam dictum feliseu pede mollis pretium. Integer tincidunt. Cras dapibus.Vivamus elementum semper nisi. Aenean vulputate eleifend magnis dis parturient montes, nascetur ridiculus mus. Donecquam felis, ultricies nec, pellentesque eu, pretium quis, sem.Nulla consequat massa quis enim. Donec pede justo, fringillavel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncusut, imperdiet a, venenatis vitae, justo. Nullam dictum feliseu pede mollis pretium. Integer tincidunt. Cras dapibus.Vivamus elementum semper nisi. Aenean vulputate eleifend magnis dis parturient montes, nascetur ridiculus mus. Donecquam felis, ultricies nec, pellentesque eu, pretium quis, sem.Nulla consequat massa quis enim. Donec pede justo, fringillavel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncusut, imperdiet a, venenatis vitae, justo. Nullam dictum feliseu pede mollis pretium. Integer tincidunt. Cras dapibus.Vivamus elementum semper nisi. Aenean vulputate eleifendmagnis dis parturient montes, nascetur ridiculus mus. Donecquam felis, ultricies nec, pellentesque eu, pretium quis, sem.Nulla consequat massa quis enim. Donec pede justo, fringillavel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncusut, imperdiet a, venenatis vitae, justo. Nullam dictum feliseu pede mollis pretium. Integer tincidunt. Cras dapibus.Vivamus elementum semper nisi. Aenean vulputate eleifend ",
    },
    { id_candidato: 1, nome: "Nome do Candidato1", tipo: "Lista" },
    { id_candidato: 2, nome: "Nome do Candidato2", tipo: "Presidente" },
    { id_candidato: 3, nome: "Nome do Candidato3", tipo: "Lista" },
    { id_candidato: 4, nome: "Nome do Candidato4", tipo: "Diretor" },
    { id_candidato: 5, nome: "Nome do Candidato4", tipo: "Diretor" },
    { id_candidato: 6, nome: "Nome do Candidato5", tipo: "Lista" },
    { id_candidato: 7, nome: "Nome do Candidato5", tipo: "Lista" },
    { id_candidato: 8, nome: "Nome do Candidato2", tipo: "Presidente" },
    { id_candidato: 39, nome: "Nome do Candidato3", tipo: "Lista" },
    { id_candidato: 40, nome: "Nome do Candidato4", tipo: "Diretor" },
    { id_candidato: 41, nome: "Nome do Candidato4", tipo: "Diretor" },
    { id_candidato: 52, nome: "Nome do Candidato5", tipo: "Lista" },
    { id_candidato: 53, nome: "Nome do Candidato5", tipo: "Lista" },
    { id_candidato: 255, nome: "Nome do Candidato2", tipo: "Presidente" },
    { id_candidato: 37, nome: "Nome do Candidato3", tipo: "Lista" },
    { id_candidato: 45, nome: "Nome do Candidato4", tipo: "Diretor" },
    { id_candidato: 46, nome: "Nome do Candidato4", tipo: "Diretor" },
    { id_candidato: 58, nome: "Nome do Candidato5", tipo: "Lista" },
    { id_candidato: 59, nome: "Nome do Candidato5", tipo: "Lista" },
  ]);

  const [choices, setChoices] = useState([]);

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
          <Form.Select>
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
