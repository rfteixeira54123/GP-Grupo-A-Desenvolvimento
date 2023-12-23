import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Front-end/Testes/Layout";
import Home from "./Front-end/Pages/Admin/Base";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
