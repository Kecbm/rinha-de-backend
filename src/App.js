import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import './css/App.css'

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
    
        while (true) {
          const response = await fetch(`${repoUrl}?page=${page}`);
          const forksData = await response.json();
    
          if (forksData.length === 0) {
            break;
          }

          page++;
    
          allForks = allForks.concat(forksData);
        }
  
        allForks.sort((a, b) => a.owner.login.localeCompare(b.owner.login));

        setForks(allForks);

        setTimeout(() => {
          setIsLoading(false);
        }, 1500); 
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

  const dateBrasilian = (isoDateString) => {
    const isoDate = new Date(isoDateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const brasilFormattedDate = isoDate.toLocaleDateString('pt-BR', options);
    return brasilFormattedDate;
  }

  return (
    <div>
      {isLoading ? (
        <h1>Carregando ... 🥚🐣</h1>
      ) : (
        <div>
          <div id="header">
            <img width="50" height="50" src="https://img.icons8.com/3d-fluency/94/chicken.png" alt="chicken" id="icon-chicken"/>
            <h1 id="title-header">
              Rinha de Backend
            </h1>

            <span className="space" />
            
            <img width="50" height="50" src="https://img.icons8.com/3d-fluency/94/star.png" alt="star" className="icon-header"/>
            <p>{repository.stargazers_count}</p>

            <img width="50" height="50" src="https://img.icons8.com/3d-fluency/94/user-male-circle.png" alt="user-male-circle" className="icon-header"/>
            <p>{repository.forks_count}</p>

            <img width="50" height="50" src="https://img.icons8.com/3d-fluency/94/laptop.png" alt="laptop" className="icon-header"/>
            <p>{repository.language}</p>

            <img width="50" height="50" src="https://img.icons8.com/3d-fluency/94/restart--v1.png" alt="restart--v1" className="icon-header"/>
            <p>{dateBrasilian(repository.updated_at)}</p>

            <span className="space" />

            <a href={repository.owner.html_url} target="_blank" rel="noopener noreferrer">
              <img src={repository.owner.avatar_url} alt={repository.owner.login} id="img-admin" />
            </a>
            <h3 id="login-admin">
              <a href={repository.owner.html_url} target="_blank" rel="noopener noreferrer">{repository.owner.login}</a>
            </h3>
          </div>

          <div id="home-content">
            {forks?.map((fork) => (
              <div key={fork.id} className="card-user">
                <a href={fork.owner.html_url} target="_blank" rel="noopener noreferrer">
                  <img src={fork.owner.avatar_url} alt={fork.owner.login}  className="user-img" />
                </a>
                <a href={fork.owner.html_url} target="_blank" rel="noopener noreferrer" className="user-login">
                  {fork.owner.login}
                </a>

                {showCardForUser[fork.owner.login] ? (
                  <div>
                    <Card userFork={searchUserData(fork.owner.login)} />
                    <button onClick={() => handleBackClick(fork.owner.login)} className="btn">Voltar</button>
                  </div>
                ) : (
                  <button onClick={() => handleButtonClick(fork.owner.login)} className="btn btn-details" >Ver detalhes</button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <footer>
        <p>Francisco Zanfranceschi</p>
        <p>Klecianny Melo</p>
      </footer>
    </div>
  );
}

export default App;
