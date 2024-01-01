import React from "react";

class Utilizador extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id_candidato: props.id_candidato,
      nome: props.nome,
      email: props.email,
      palavra_passe: props.palavra_passe,
      estado: props.estado,
      acessibilidade: props.acessibilidade,
    };
  }

  render() {
    return (
      <div>
        <p>Nome: {this.state.nome}</p>
        <p>Nome: {this.state.email}</p>
        <p>Nome: {this.state.estado}</p>
        <p>Nome: {this.state.acessibilidade}</p>
      </div>
    );
  }
}
