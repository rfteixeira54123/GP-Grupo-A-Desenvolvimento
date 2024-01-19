import Eleicao from "../Objetos/ClassEleicao";

class GereEleicao {
  constructor() {
    this.eleicoes = [];
  }

  eleicoesAntes(data) {
    return this.eleicoes.filter((e) => e.data < data);
  }

  encontrarEleicao(id) {
    if (this.eleicoes.filter((e) => e.id_eleicao === id) != null) return true;
    return false;
  }

  getEleicao(id) {
    return this.eleicoes.filter((e) => e.id_eleicao === id);
  }

  getListagemEleicoes() {
    return this.eleicoes;
  }

  votou(id) {
    if (
      this.eleicoes.filter(
        (e) => e.lista_eleitores_presenca.filter((el) => el.id_conta) === id
      )
    )
      return true;
    return false;
  }

  votar(id_eleitor, id_eleicao, id_candidato) {
    const eleicaoSelecionada = this.eleicoes.find(
      (e) => e.id_eleicao === id_eleicao
    );
    if (eleicaoSelecionada)
      if (eleicaoSelecionada.lista_eleitores_presenca.includes(id_eleitor)) {
        const candidatoSelecionado = eleicaoSelecionada.gestorCandidatos.find(
          (c) => c.id_candidato === id_candidato
        );
        if (candidatoSelecionado) {
          candidatoSelecionado.votos += 1;
          return true;
        }
      }
    return false;
  }

  listagemEleicoesMes(mes) {
    return this.eleicoes.filter((e) => {
      const data = new Date(e.data);
      return data.getMonth() + 1 === mes;
    });
  }

  criarEleicao(eleicao) {
    return this.eleicoes.push(eleicao);
  }

  editarEleicao(id, eleicao) {
    const novaeleicao = this.eleicoes.find((e) => e.id_eleicao === id);

    if (novaeleicao) {
      Object.assign(novaeleicao, eleicao);
      return true;
    }
    return false;
  }

  adicionarCandidato(id_eleicao, candidato) {
    const novaeleicao = this.eleicoes.find((e) => e.id_eleicao === id_eleicao);
    if (novaeleicao) {
      novaeleicao.gestorCandidatos.adicionarCandidato(candidato);
      return true;
    }
    return false;
  }
}

export { Eleicao, GereEleicao };
