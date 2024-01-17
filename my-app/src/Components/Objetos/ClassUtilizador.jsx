import React from "react";

class Utilizador extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id_conta: props.id_conta,
      nome: props.nome,
      email: props.email,
      palavra_passe: props.palavra_passe,
      numero_id: props.numero_id,
      estado: props.estado,
      tipo: props.tipo,
      acessibilidade: props.acessibilidade,
    };
  }

  getID() {
    return this.id_conta;
  }

  getNome() {
    return this.nome;
  }

  getEmail() {
    return this.email;
  }

  getEstado() {
    return this.estado;
  }

  getAcessibilidade() {
    return this.acessibilidade;
  }

  getAtivo() {
    return this.estado;
  }

  setAcessibilidade(acessibilidade) {
    this.acessibilidade = acessibilidade;
  }

  setAtivo(estado) {
    this.estado = estado;
  }

  mudarPassword(novaPassword) {
    this.palavra_passe = novaPassword;
  }

  autenticar(email, password) {
    if (this.email === email && this.palavra_passe === password) return true;
    return false;
  }

  logout() {
    //TODO
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

export default Utilizador;
