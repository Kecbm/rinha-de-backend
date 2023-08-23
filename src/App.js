import React, { useState, useEffect } from 'react';

function App() {
  const [repository, setRepository] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const accessToken = process.env.GITHUB_TOKEN;

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
        var page = 1;
        var allLogins = [];
    
        while (true) {
          const response = await fetch(`${repoUrl}?page=${page}`);
          const forksData = await response.json();
    
          if (forksData.length === 0) {
            break; // Saia do loop se não houver mais forks
          }

          page++;
    
          const logins = forksData.map(fork => fork.owner.login);
          allLogins = allLogins.concat(logins);
        }
    
        setUsers(allLogins);
        console.log('allLogins: ', allLogins);
      } catch (error) {
        console.error('Erro ao buscar forks: ', error);
      }
    }

    // async function fethAllRepositories() {
    //   var allRepositories = [];

    //   for (const login of users) {
    //     try {
    //       const repositoryUrl = `https://api.github.com/${login}/rinha-de-backend`;
    //       const repositoryResponse = await fetch(repositoryUrl);
    //       const repositoryData = await repositoryResponse.json();
  
    //       allRepositories = allRepositories.concat(repositoryData);
    //       setIsLoading(false);
    //       console.log(`Informações do usuário ${login}: `, repositoryData);
    //     } catch (error) {
    //       console.error(`Erro ao buscar informações do usuário ${login}: `, error);
    //     }
    //   }
    // }

    async function fethAllRepositories() {
      try {
        var allRepositories = [];
        const batchSize = 170; // Tamanho do lote de logins por chamada
    
        // Dividir os logins em lotes menores
        for (let i = 0; i < users.length; i += batchSize) {
          const batchLogins = users.slice(i, i + batchSize);
    
          // Fazer uma única chamada para todos os logins no lote atual
          const batchPromises = batchLogins.map(async login => {
            try {
              const repositoryUrl = (`https://api.github.com/users/${login}/rinha-de-backend`, {
                headers: {
                  Authorization: `Bearer ${accessToken}`
                }
              });
              const repositoryResponse = await fetch(repositoryUrl);
              const repositoryData = await repositoryResponse.json();
              return repositoryData;
            } catch (error) {
              console.error(`Erro ao buscar informações do usuário ${login}: `, error);
              return null;
            }
          });
    
          // Esperar todas as chamadas do lote atual
          const batchResults = await Promise.all(batchPromises);
    
          // Filtrar resultados nulos (chamadas com erro)
          const validResults = batchResults.filter(result => result !== null);
    
          allRepositories = allRepositories.concat(validResults);
        }
    
        setIsLoading(false);
        console.log('Informações de todos os repositórios: ', allRepositories);
      } catch (error) {
        console.error('Erro ao buscar informações dos repositórios: ', error);
      }
    }    

    fetchRepository();
    fetchAllForks();
    fethAllRepositories();
  }, []);

  return (
    <div>
      <h1>Rinha de Backend 🐓</h1>
      {
        isLoading ? <h1>Carregando ... 🥚🐣</h1> :
        <div>
          {/* <div>
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
          </div> */}

          {/* <ul>
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
          </ul> */}
        </div>
      }
    </div>
  );
}

export default App;
