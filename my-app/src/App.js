import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Front-end/Testes/Layout";
import Home from "./Front-end/Testes/Home";
import Eleicoes from "./Front-end/Pages/Admin/GerirEleicoes";
import Eventos from "./Front-end/Pages/Admin/GerirEventos";
import Contas from "./Front-end/Pages/Admin/GerirContas";
import Candidatos from "./Front-end/Pages/Admin/GerirCandidatos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="ex1"
            element={<Contas />}
          />
          <Route
            path="ex2"
            element={<Eleicoes />}
          />
          <Route
            path="ex3"
            element={<Candidatos />}
          />
          <Route
            path="ex4"
            element={<Eventos />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
