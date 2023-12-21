import React from 'react';
import logo from './logo.svg';
import './App.css';

import GetCandidatosListar from '../Components/GetCandidatos';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <GetCandidatosListar/>
      </header>
    </div>
  );
}

export default App;
