// import "./App.css";

import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
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
          <Route path="home/vote" element={<Votacao />} />
          <Route path="*" element={<Navigate to="home" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
