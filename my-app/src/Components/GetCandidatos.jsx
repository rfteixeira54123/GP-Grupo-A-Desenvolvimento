import React, { useState, useEffect } from "react";

export default function GetCandidatosListar() {
  const [listas, setListas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://gp-api-alpha.vercel.app/candidato/listar",
          {
            method: "GET",
            mode: "cors",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Erro na solicitação: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log(data);
        setListas(data.Listas);
      } catch (error) {
        console.error("Erro na solicitação:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="posts-container">
      <div className="post-card">
        {listas.map((lista) => (
          <div key={lista.ID_Lista_Candidatos}>
            <p>ID da Lista: {lista.ID_Lista_Candidatos}</p>
            <div className="candidatos-list">
              {lista.Candidatos.map((candidato) => (
                <div key={candidato.ID_Candidato}>
                  <p>ID do Candidato: {candidato.ID_Candidato}</p>
                  <p>Nome: {candidato.Nome}</p>
                  <p>Tipo: {candidato.Tipo}</p>
                  <p>Descrição: {candidato.Descricao}</p>
                  <p>Votos: {candidato.Votos}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// nations
