import {TableEventos} from "../../Componentes/Table";

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
//  array: objetos do tipo Evento
const Page = (props) => {
  return (
    <div style={styleWindow}>
      <div style={{width: "80%", height: "80%",}}>
        <TableEventos 
          array={[
            {id_evento: 0, nome: "ANome do Evento ", data: "22/10/2023 às 15:30"},
            {id_evento: 1, nome: "Nome do Evento ", data: "22/10/2023 às 15:30"},
            {id_evento: 2, nome: "Nome do Evento ", data: "22/10/2023 às 15:30"},
            {id_evento: 3, nome: "BNome do Evento ", data: "22/10/2023 às 15:30"},
            {id_evento: 4, nome: "Nome do Evento ", data: "22/10/2023 às 15:30"},
            {id_evento: 5, nome: "Nome do Evento ", data: "22/10/2023 às 15:30"},
            {id_evento: 6, nome: "Nome do Evento ", data: "22/10/2023 às 15:30"},
          ]}/>
      </div>
    </div>
  );
};

export default Page;