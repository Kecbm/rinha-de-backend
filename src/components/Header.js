import React, { useState, useEffect } from 'react';
import '../css/Header.css'

function App() {
  const [repository, setRepository] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRepository() {
      try {
        const repoUrl = 'https://api.github.com/repos/zanfranceschi/rinha-de-backend-2023-q3';
        const response = await fetch(repoUrl);
        const repositoryData = await response.json();

        setRepository(repositoryData);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar informações do repositório: ', error);
      }
    }

    fetchRepository();
  }, []);

  return (
    <div id="header">
    <img width="50" height="50" src="https://img.icons8.com/3d-fluency/94/chicken.png" alt="chicken" id="icon-chicken"/>
    <a href="https://github.com/zanfranceschi/rinha-de-backend-2023-q3" target="_blank" rel="noopener noreferrer">
        <h1 id="title-header">
        Rinha de Backend
        </h1>
    </a>

    <span className="space" />
    
    <button className="btn">Participantes</button>
    <button className="btn">Top 10</button>
    <button className="btn">Vencedor</button>
    <button className="btn">Forks</button>
    <button className="btn">Linguagens</button>
    <button className="btn">Prêmios</button>

    <span className="space" />

    {isLoading ? null : (
        <div id="admin-infos">
        <a href={repository.owner?.html_url ?? ''} target="_blank" rel="noopener noreferrer">
            <img src={repository.owner?.avatar_url} alt={repository.owner?.login} id="img-admin" />
        </a>
        <h3 id="login-admin">
            <a href={repository.owner?.html_url ?? ''} target="_blank" rel="noopener noreferrer">
            {repository.owner?.login}
            </a>
        </h3>
        </div>
    )}
    </div>
  );
}

export default App;
