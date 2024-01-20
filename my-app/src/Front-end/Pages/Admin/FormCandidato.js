import Form from "react-bootstrap/Form";

import * as constants from "../../constants";
import Button from "../../Componentes/ButtonSmall";

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
  const handleAdicionar = () => {
    //Fazer função para adicionar candidato
    console.log("adicionar");
  };

  const handleEditar = () => {
    //Fazer função para editar candidato
    console.log("editar");
  };

  return (
      <div style={styleContainer}>
        <div style={styleTop}>{obj.id_candidato ? "Editar" : "Adicionar"} candidato</div>
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
            <Form.Control type="text" defaultValue={obj.nome}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tipo: </Form.Label>
            <Form.Control type="text" defaultValue={obj.tipo}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Foto: </Form.Label>
            <Form.Control type="file"  defaultValue={obj.foto}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Objetivos: </Form.Label>
            <Form.Control as="textarea" rows={3}  defaultValue={obj.descricao}/>
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
          <Button label={obj.id_candidato ? "Editar" : "Adicionar"} handle={obj.id_candidato ? handleEditar : handleAdicionar} />
        </div>
      </div>
  );
};

FormC.defaultProps = {
  obj: {nome: "", descricao: "", tipo: "", foto: ""},
}

export default FormC;
