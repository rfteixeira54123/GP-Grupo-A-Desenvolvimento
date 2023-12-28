import {TableCandidatos} from "../../Componentes/Table";

const styleWindow = {
  background: "pink",
  width: "100%",
  margin: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
};


// Recebe props:
//  array: objetos do tipo Eleicao
const Page = (props) => {
  return (
    <div style={styleWindow}>
      <div style={{width: "80%", height: "80%",}}>
        <TableCandidatos 
          array={[
            {id_candidato:0, nome: "Nome do Candidato", tipo: "Lista"},
            {id_candidato:1, nome: "Nome do Candidato", tipo: "Lista"},
            {id_candidato:2, nome: "Nome do Candidato", tipo: "Presidente"},
            {id_candidato:3, nome: "Nome do Candidato", tipo: "Lista"},
            {id_candidato:4, nome: "Nome do Candidato", tipo: "Diretor"},
            {id_candidato:5, nome: "Nome do Candidato", tipo: "Lista"},
            
          ]}/>
      </div>
    </div>
  );
};

export default Page;