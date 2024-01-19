import React from "react";

class Evento extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id_evento: props.id,
      nome: props.nome,
      descricao: props.descricao,
      data: props.data,
      responsavel: props.responsavel,
    };
  }

  render() {
    return (
      <div>
        <p>Nome: {this.state.nome}</p>
        <p>Descrição: {this.state.descricao}</p>
        <p>Data: {this.state.data}</p>
        <p>Responsável: {this.state.responsavel}</p>
      </div>
    );
  }
}

export default Evento;
