import React from "react";

class Eleicao extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      nome: props.nome,
      dataInicio: props.inicio,
      dataFim: props.dataFim,
      eleitores: props.eleitores || [],
      descricao: props.descricao,
      cargoDisputado: props.cargoDisputado,
      estado: props.estado,
    };
  }

  render() {
    return (
      <div>
        <h2>{props.name}</h2>
        <h3>{props.cargoDisputado}</h3>
        <p>Data de Inicio: {props.dataInicio}</p>
        <p>Data de Fim: {props.dataFim}</p>
        <p>Descrição: {props.descricao}</p>
        <div>
          <h3>Eleitores:</h3>
          <ul>
            {props.eleitores.map((eleitor, index) => (
              <li key="index">{eleitor}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Eleicao;
