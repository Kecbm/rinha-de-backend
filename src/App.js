import React, { useState, useEffect } from 'react';

function App() {
  const [repository, setRepository] = useState([]);
  const [forks, setForks] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRepository() {
      try {
        const repoUrl = 'https://api.github.com/repos/zanfranceschi/rinha-de-backend-2023-q3';
        const response = await fetch(repoUrl);
        const repositoryData = await response.json();
        setRepository(repositoryData);
        setIsLoading(false);
        console.log('repositoryData: ', repositoryData);
      } catch (error) {
        console.error('Erro ao buscar informações do repositório: ', error);
      }
    }

    async function fetchAllForks() {
      try {
        const repoUrl = 'https://api.github.com/repos/zanfranceschi/rinha-de-backend-2023-q3/forks';
        let page = 1;
        let allForks = [];
        let allLogins = [];
    
        while (true) {
          const response = await fetch(`${repoUrl}?page=${page}`);
          const forksData = await response.json();
    
          if (forksData.length === 0) {
            break; // Saia do loop se não houver mais forks
          }
    
          allForks = allForks.concat(forksData);
          page++;
    
          const logins = forksData.map(fork => fork.owner.login);
          allLogins = allLogins.concat(logins);
        }
    
        setForks(allForks);
        setIsLoading(false);
        // console.log('allForks: ', allForks);
        setUsers(allLogins);
        console.log('allLogins: ', allLogins);
      } catch (error) {
        console.error('Erro ao buscar forks: ', error);
      }
    }
    
    //  TODO: Com allUsers em users fazer chamada para url personalizada: https://github.com/${korodzi}/rinha-de-backend onde tem informações de cada repositório individual
    //  Com essas informações montar o card na página 

    fetchRepository()
    fetchAllForks();
  }, []);

  return (
    <div>
      <h1>Rinha de Backend 🐓</h1>
      {
        isLoading ? <h1>Carregando ... 🥚🐣</h1> :
        <div>
          <div>
            <p>Descrição: {repository.description}</p>
            <p>Estrelas: {repository.stargazers_count}</p>
            <p>Forks: {repository.forks_count}</p>
            <p>Linguagem: {repository.language}</p>
            <p>Data de Criação: {repository.created_at}</p>
            <p>Última Atualização: {repository.updated_at}</p>
            <p>Proprietário: <a href={repository.owner.html_url} target="_blank" rel="noopener noreferrer">{repository.owner.login}</a></p>
            <a href={repository.owner.html_url} target="_blank" rel="noopener noreferrer">
              <img src={repository.owner.avatar_url} alt={repository.owner.login} style={{ borderRadius: '50%', width: '100px', height: '100px' }} />
            </a>
          </div>
          <ul>
            {forks?.map((fork) => (
              <li key={fork.id}>
                <p>
                  <strong>
                    <a href={fork.owner.html_url} target="_blank" rel="noopener noreferrer">
                      {fork.owner.login}
                    </a>
                  </strong>
                </p>
                <a href={fork.owner.html_url} target="_blank" rel="noopener noreferrer">
                  <img src={fork.owner.avatar_url} alt={fork.owner.login} style={{ borderRadius: '50%', width: '100px', height: '100px' }} />
                </a>
                <p><strong>URL:</strong> <a href={fork.html_url} target="_blank" rel="noopener noreferrer">{fork.html_url}</a></p>
                <p>{fork.updated_at}</p>
              </li>
            ))}
          </ul>
        </div>
      }
    </div>
  );
}

export default App;
