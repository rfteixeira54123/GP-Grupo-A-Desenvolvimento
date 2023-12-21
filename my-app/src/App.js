import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Front-end/Testes/Layout";
import Home from "./Front-end/Testes/Home";
import Menu from "./Front-end/Componentes/Menu";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="ex2"
            element={
              <Menu
                id={["MenuBtn1", "MenuBtn2", "MenuBtn3", "MenuBtn4"]}
                label={["Gestão de Contas", "Gestão de Eleições", "Gestão de Candidatos", "Gestão de Eventos"]}
                state={[false, false, false, false]}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
