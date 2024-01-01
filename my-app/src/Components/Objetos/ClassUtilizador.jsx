import React from "react";

class Utilizador extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      nome: props.nome,
      email: props.email,
      palavra_passe: props.palavra_passe,
      estado: props.estado,
      acessibilidade: props.acessibilidade,
    };
  }
}
