import Utilizador from "../Objetos/ClassUtilizador";

class GereContas {
  constructor() {
    this.contas = [];
  }

  listarContas() {
    return this.contas;
  }

  listarContasTipo(tipo) {
    return this.contas.filter((c) => c.tipo === tipo);
  }

  getUtilizador(id) {
    return this.contas.filter((c) => c.id === id);
  }

  getListagemUtilizador(nome, tipo) {
    return this.contas.filter((c) => c.tipo === tipo && c.nome === nome);
  }

  inserirConta(candidato) {
    this.contas.push(contas);
  }

  editarConta(id, novaConta) {
    const index = this.contas.findIndex((c) => c.id_conta === id);
    if (index !== -1) {
      this.contas[index] = novaConta;
    }
  }

  removerConta(id) {
    this.contas = this.contas.filter((c) => c.id_conta !== id);
  }

  definirContaAtivo(id, estado) {}

  logOutConta(id) {}
}

export { Utilizador, GereContas };
