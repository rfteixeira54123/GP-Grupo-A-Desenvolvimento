import React from "react";

class Eleicao extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id_eleicao: props.id_eleicao,
      nome: props.nome,
      data_inicio: props.data_inici,
      data_fim: props.data_fim,
      lista_eleitores_presenca: props.lista_eleitores_presenca || [],
      descricao: props.descricao,
      cargo_disputa: props.cargo_disputa,
      estado: props.estado,
    };
  }

  render() {
    return (
      <div>
        <h2>{this.state.nome}</h2>
        <h3>{this.state.cargo_disputa}</h3>
        <p>Data de Inicio: {this.state.data_inicio}</p>
        <p>Data de Fim: {this.state.data_fim}</p>
        <p>Descrição: {this.state.descricao}</p>
        <div>
          <h3>Eleitores:</h3>
          <ul>
            {this.state.lista_eleitores_presenca.map((eleitor, index) => (
              <li key={index}>{eleitor}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Eleicao;
