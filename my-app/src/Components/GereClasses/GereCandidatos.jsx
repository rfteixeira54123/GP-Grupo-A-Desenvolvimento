import Candidato from "../Objetos/ClassCandidato";

class GereCandidatos {
  constructor() {
    this.candidatos = [];
  }

  listarCandidatos() {
    return this.candidatos;
  }

  listarCandidatosTipo(tipo) {
    return this.candidatos.filter((c) => c.tipo === tipo);
  }

  getNumeroVotos() {
    return this.candidatos.reduce((total, c) => total + c.getNumeroVotos(), 0);
  }

  getNumeroVotos(id) {
    return this.candidatos.filter((c) => c.id_candidato === id);
  }

  getCandidato(id) {
    return this.candidatos.filter((c) => c.id_candidato === id);
  }

  getListagemCandidato(nome, tipo) {
    return this.candidatos.filter((c) => c.tipo === tipo && c.nome === nome);
  }

  inserirCandidato(candidato) {
    this.candidatos.push(candidato);
  }

  editarCandidato(id, novoCandidato) {
    const index = this.candidatos.findIndex((c) => c.id_candidato === id);
    if (index !== -1) {
      this.candidatos[index] = novoCandidato;
    }
  }

  removerCandidato(id) {
    this.candidatos = this.candidatos.filter((c) => c.id_candidato !== id);
  }
}

export { Candidato, GereCandidatos };
