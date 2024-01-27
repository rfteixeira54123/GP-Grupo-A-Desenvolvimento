// import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';
import { Outlet } from "react-router-dom";
import Admin from "./Front-end/Pages/Admin/Base";
import Eleitor from "./Front-end/Pages/Eleitor/Base";
import Home from "./Front-end/Pages/Home";
import Login from "./Front-end/Pages/Login";
import Votacao from "./Front-end/Pages/Eleitor/Votacao";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="ad" element={<Admin />} />
          <Route path="el" element={<Eleitor />} />
          <Route path="home/vote" element={<Votacao />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
