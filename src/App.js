import React, { useState, useEffect } from 'react';
import Card from './components/Card';

function App() {
  const [repository, setRepository] = useState([]);
  const [forks, setForks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCardForUser, setShowCardForUser] = useState({});

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
      } catch (error) {
        console.error('Erro ao buscar forks: ', error);
      }
    }

    fetchRepository();
    fetchAllForks();
  }, []);

  const handleButtonClick = (userLogin) => {
    setShowCardForUser({ ...showCardForUser, [userLogin]: true });
  };

  const handleBackClick = (userLogin) => {
    setShowCardForUser({ ...showCardForUser, [userLogin]: false });
  };

  const searchUserData = (userLogin) => {
    const userFork = forks.find((fork) => fork.owner.login === userLogin);

    return userFork;
  }

  return (
    <div>
      <h1>Rinha de Backend 🐓</h1>
      {isLoading ? (
        <h1>Carregando ... 🥚🐣</h1>
      ) : (
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

                {showCardForUser[fork.owner.login] ? (
                  <div>
                    <Card userLogin={fork.owner.login} userFork={searchUserData(fork.owner.login)} />
                    <button onClick={() => handleBackClick(fork.owner.login)}>Voltar</button>
                  </div>
                ) : (
                  <button onClick={() => handleButtonClick(fork.owner.login)}>Ver detalhes</button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
