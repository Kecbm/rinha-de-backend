import React, { useState, useEffect } from 'react';

function App() {
  const [repository, setRepository] = useState([]);
  const [forks, setForks] = useState([]);
  // const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserDataRepository, setIsUserDataRepository] = useState(false);
  const [userRepository, setUserRepository] = useState([]);

  useEffect(() => {
    async function fetchRepository() {
      try {
        const repoUrl = 'https://api.github.com/repos/zanfranceschi/rinha-de-backend-2023-q3';
        const response = await fetch(repoUrl);
        const repositoryData = await response.json();
        setRepository(repositoryData);
      } catch (error) {
        console.error('Erro ao buscar informações do repositório: ', error);
      }
    }

    async function fetchAllForks() {
      try {
        const repoUrl = 'https://api.github.com/repos/zanfranceschi/rinha-de-backend-2023-q3/forks';
        var page = 1;
        var allForks = [];
        // var allLogins = [];
    
        while (true) {
          const response = await fetch(`${repoUrl}?page=${page}`);
          const forksData = await response.json();
    
          if (forksData.length === 0) {
            break; // Saia do loop se não houver mais forks
          }

          page++;
    
          allForks = allForks.concat(forksData);
          // const logins = forksData.map(fork => fork.owner.login);
          // allLogins = allLogins.concat(logins);
        }
    
        // setUsers(allLogins);
        // console.log('allLogins: ', allLogins);
        setForks(allForks);
        setIsLoading(false);
        console.log('allForks: ', allForks);
      } catch (error) {
        console.error('Erro ao buscar forks: ', error);
      }
    } 

    fetchRepository();
    fetchAllForks();
  }, []);

  async function fethUserRepository(userLogin) {
    try {
      const repositoryUrl = `https://api.github.com/repos/${userLogin}/rinha-de-backend`;
      const repositoryResponse = await fetch(repositoryUrl);
      const repositoryData = await repositoryResponse.json();

      console.log(`Informações do usuário ${userLogin}: `, repositoryData);
      setIsUserDataRepository(true);
      setUserRepository(repositoryData);
    } catch (error) {
      console.error(`Erro ao buscar informações do usuário ${userLogin}: `, error);
    }
  }

  const handleMouseLeave = () => {
    setIsUserDataRepository(false);
  };

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
              <li
                key={fork.id}
              >
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
                <button
                  onMouseEnter={() => fethUserRepository(fork.owner.login)}
                  onMouseLeave={handleMouseLeave}
                  style={{ padding: '8px 16px' }}
                >
                  Repositório 🔍
                </button>
                {
                  isUserDataRepository ?
                    <div>
                      <p>Linguagem: {userRepository.language}</p>
                      <p><strong>Link para o Repositório:</strong> <a href={repository.html_url} target="_blank" rel="noopener noreferrer">{repository.html_url}</a></p>
                      <p><strong>Criado em:</strong> {repository.created_at}</p>
                      <p><strong>Última Atualização:</strong> {repository.updated_at}</p>
                      <p><strong>Clone URL:</strong> {repository.clone_url}</p>
                    </div>
                    
                  :
                    
                    <div>
                      <p><strong>URL:</strong> <a href={fork.html_url} target="_blank" rel="noopener noreferrer">{fork.html_url}</a></p>
                      <p>{fork.updated_at}</p>
                    </div>
                }
              </li>
            ))}
          </ul>
        </div>
      }
    </div>
  );
}

export default App;
