import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Front-end/Testes/Layout";
import Home from "./Front-end/Pages/Admin/Base";
import Login from "./Front-end/Pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="ad" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
