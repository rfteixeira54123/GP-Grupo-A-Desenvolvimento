import React from "react";

class Candidato extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id_candidato: props.id_candidato,
      nome: props.nome,
      tipo: props.tipo,
      descricao: props.descricao,
      votos: props.votos,
    };
  }

  getID() {
    return this.id_candidato;
  }

  getNome() {
    return this.nome;
  }

  getTipo() {
    return this.tipo;
  }

  getDescricao() {
    return this.descricao;
  }

  getNumVotos() {
    return this.votos;
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
