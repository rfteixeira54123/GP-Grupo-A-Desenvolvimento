import React from "react";

class Candidato extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      nome: props.nome,
      tipo: props.tipo,
      descricao: props.descricao,
      votos: props.votos,
    };
  }

  render() {
    return (
      <div>
        <p>Nome: {this.state.nome}</p>
        <p>Tipo: {this.state.tipo}</p>
        <p>Descrição: {this.state.descricao}</p>
      </div>
    );
  }
}

export default Candidato;
