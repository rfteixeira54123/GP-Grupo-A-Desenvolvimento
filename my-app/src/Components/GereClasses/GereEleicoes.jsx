import Eleicao from "../Objetos/ClassEleicao";

class GereEleicao {
  constructor() {
    this.eleicoes = [];
  }

  eleicoesAntes(data) {
    return this.eleicoes.filter((e) => c.data < data);
  }

  encontrarEleicao(id){
    if (this.eleicoes.filter((e) => e.id_eleicao == id) != null)
      return true
    return false
  }

  getEleicao(id){
    return this.eleicoes.filter((e) => e.id_eleicao == id);
  }

  getListagemEleicoes(){
    return this.eleicoes;
  }

  votou(id){
    if(this.eleicoes.filter((e) => e.lista_eleitores_presenca.filter((el) => el.id_conta) == id))
      return true
    return false
  }

  votar(id_eleitor,id_eleicao,id_candidato){
    this.eleicoes.filter((e) => e.id_eleicao == id_eleicao)
    .filter((e1) => e1.lista_eleitores_presenca = id_eleitor)
    this.eleicoes.gestorCandidatos.filter((c) => c.id_candidato = id_candidato).votos +=1    
  }

  listagemEleicoesMes(mes){
    return this.eleicoes.filter((e) => {
      const data = new Date(e.data);
      return data.getMonth() + 1 == mes;
    });
  }

  criarEleicao(eleicao){
    return this.eleicoes.push(eleicao)
  }

  editarEleicao(id,eleicao){
    return this.eleicoes.filter((e) => e.id_eleicao == id) = eleicao;
  }

  adicionarCandidato(id_eleicao,candidato){
    return this.eleicoes.filter((e) => e.id_eleicao == id_eleicao).gestorCandidatos.adicionarCandidato(candidato)
  }
  
}

export { Eleicao, GereContas };
