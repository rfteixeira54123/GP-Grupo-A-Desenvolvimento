import Evento from "../Objetos/ClassEveno";

class GereEvento {
  constructor() {
    this.eventos = [];
  }

  inserirEvento(evento) {
    this.eventos.push(evento);
  }

  listarEventos() {
    return this.eventos;
  }

  getListagemEvento(nome) {
    return this.eventos.filter((e) => e.nome === nome);
  }

  listarEventosMes(data) {
    return this.eventos.filter((e) => e.data === data);
  }
}

export { Evento, GereContas };
