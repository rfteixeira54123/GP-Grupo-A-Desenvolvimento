import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";

import GetCandidatosListar from "../Components/GetCandidatos";
import Form from "../Components/FormPost";

function App() {
  useEffect(() => {
    if (document) {
      const stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href =
        "https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css";

      document.head.appendChild(stylesheet);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="py-6">
          <Form />
        </div>
      </header>
    </div>
  );
}

export default App;
