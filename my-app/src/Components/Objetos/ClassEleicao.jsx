import React from "react";

//Métodos como o getDataFim e DataInicio podem ter nomes diferentes
//do que era pedido no documento de classes. Isto porque no documento ´
//original apenas está o método getData().

//O método encontrarCandidato, numeroVotos & getTipos estão comentados
//porque não fazem sentido existir nesta classe 

class Eleicao extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id_eleicao: props.id_eleicao,
      nome: props.nome,
      data_inicio: props.data_inici,
      data_fim: props.data_fim,
      lista_candidatos:props.lista_candidatos,
      lista_eleitores_presenca: props.lista_eleitores_presenca || [],
      descricao: props.descricao,
      cargo_disputa: props.cargo_disputa,
      estado: props.estado,
    };  
  }

  getID(){
    return this.id_eleicao;
  } 

  getNome(){
    return this.nome;
  }

  getEstado(){
    return this.estado;
  }

  getDataInicio(){
    return this.data_inicio
  }


  getDataFim(){
    return this.data_fim
  }

  getDescricao(){
    return this.descricao
  }

  getCargo(){
    return this.cargo_disputa
  }

  definirEstado(estado){
    this.estado = estado
  }

  encontrarEleitor(id){
    return lista_eleitores_presenca.filter((e) => e.id_conta === id)
  }

  // encontrarCandidatos(id){
  //   return lista_candidatos.filter((c) => c.id_candidato === id)
  // }

  // numeroVotos(){
  //   return this.lista_candidatos.reduce((total, c) => total + c.getNumeroVotos(), 0);
  // }

  // getTipos(){
  //   return this.t
  // }


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
