import {TableUtilizadores} from "../../Componentes/Table";

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
      <div style={{width: "100%", height: "80%",}}>
        <TableUtilizadores 
          array={[
            {id_conta:0, nome: "Nome do Utilizador Completo", email: "a20121456@estgoh.ipc.pt", numero_id: "a2021258755", tipo:"Administrador", estado: true},
            {id_conta:1, nome: "Nome do Utilizador Completo", email: "a20121456@estgoh.ipc.pt", numero_id: "a2021258755", tipo:"Administrador", estado: true},
            {id_conta:2, nome: "Nome do Utilizador Completo", email: "a20121456@estgoh.ipc.pt", numero_id: "a2021258755", tipo:"Administrador", estado: false},
            {id_conta:3, nome: "Nome do Utilizador Completo", email: "a20121456@estgoh.ipc.pt", numero_id: "a2021258755", tipo:"Eleitor", estado: true},
            {id_conta:4, nome: "Nome do Utilizador Completo", email: "a20121456@estgoh.ipc.pt", numero_id: "a2021258755", tipo:"Eleitor", estado: false},
            {id_conta:5, nome: "Nome do Utilizador Completo", email: "a20121456@estgoh.ipc.pt", numero_id: "a2021258755", tipo:"Eleitor", estado: true},
            {id_conta:6, nome: "Nome do Utilizador Completo", email: "a20121456@estgoh.ipc.pt", numero_id: "a2021258755", tipo:"Eleitor", estado: false},
            {id_conta:7, nome: "Nome do Utilizador Completo", email: "a20121456@estgoh.ipc.pt", numero_id: "a2021258755", tipo:"Eleitor", estado: true},
            {id_conta:8, nome: "Nome do Utilizador Completo", email: "a20121456@estgoh.ipc.pt", numero_id: "a2021258755", tipo:"Eleitor", estado: true},
            {id_conta:9, nome: "Nome do Utilizador Completo", email: "a20121456@estgoh.ipc.pt", numero_id: "a2021258755", tipo:"Eleitor", estado: true},
          ]}/>
      </div>
    </div>
  );
};

export default Page;