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
        }, 3500); 
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
      <div id="header">
        <img width="50" height="50" src="https://img.icons8.com/3d-fluency/94/chicken.png" alt="chicken" id="icon-chicken"/>
        <a href="https://github.com/zanfranceschi/rinha-de-backend-2023-q3" target="_blank" rel="noopener noreferrer">
          <h1 id="title-header">
            Rinha de Backend
          </h1>
        </a>

        <span className="space" />
        
        <button className="btn">Forks</button>
        <button className="btn">Top 10</button>
        <button className="btn">Vencedor</button>

        <span className="space" />

        {repository && (
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
      {isLoading ? (
        <div className="loading-home">
          <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/chicken.png" alt="chicken"/>
          <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/eggs.png" alt="eggs"/>
          <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/sunny-side-up-eggs.png" alt="sunny-side-up-eggs"/>
        </div>
      ) : (
        <div>
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
                  <div className="card-user-infos">
                    <Card userFork={searchUserData(fork.owner.login)} />
                    <button onClick={() => handleBackClick(fork.owner.login)} className="btn btn-return"><img width="30" height="30" src="https://img.icons8.com/ios-filled/50/FFFFFF/long-arrow-left.png" alt="long-arrow-left" id="arrow-left"/> Voltar</button>
                  </div>
                ) : (
                  <button onClick={() => handleButtonClick(fork.owner.login)} className="btn btn-details" >Ver detalhes <img width="30" height="30" src="https://img.icons8.com/ios-filled/50/FFFFFF/long-arrow-right.png" alt="long-arrow-right" id="arrow-rigth"/></button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <footer>
        <div>
          <h3>Francisco Zanfranceschi</h3>
          <a href="https://github.com/zanfranceschi" target="_blank" rel="noopener noreferrer">
            <img width="50" height="50" src="https://img.icons8.com/ios-glyphs/90/FFFFFF/github.png" alt="GitHub"/>
          </a>
          <a href="https://twitter.com/zanfranceschi" target="_blank" rel="noopener noreferrer">
            <img width="50" height="50" src="https://img.icons8.com/ios-glyphs/90/FFFFFF/twitter--v1.png" alt="Twitter"/>
          </a>
          <a href="https://www.linkedin.com/in/francisco-zanfranceschi/" target="_blank" rel="noopener noreferrer">
            <img width="50" height="50" src="https://img.icons8.com/ios-glyphs/90/FFFFFF/linkedin.png" alt="Linkedin"/>
          </a>
          <a href="https://dev.to/zanfranceschi" target="_blank" rel="noopener noreferrer">
            <img width="50" height="50" src="https://img.icons8.com/windows/96/FFFFFF/dev.png" alt="Dev.to"/>
          </a>
          <a href="https://www.youtube.com/@zanfranceschi/videos" target="_blank" rel="noopener noreferrer">
            <img width="50" height="50" src="https://img.icons8.com/ios-glyphs/90/FFFFFF/youtube--v1.png" alt="Youtube"/>
          </a>
        </div>

        <div>
          <h3>Klecianny Melo</h3>
          <a href="https://github.com/Kecbm" target="_blank" rel="noopener noreferrer">
            <img width="50" height="50" src="https://img.icons8.com/ios-glyphs/90/FFFFFF/github.png" alt="GitHub"/>
          </a>
          <a href="https://twitter.com/Kecbm" target="_blank" rel="noopener noreferrer">
            <img width="50" height="50" src="https://img.icons8.com/ios-glyphs/90/FFFFFF/twitter--v1.png" alt="Twitter"/>
          </a>
          <a href="https://www.linkedin.com/in/kecbm/" target="_blank" rel="noopener noreferrer">
            <img width="50" height="50" src="https://img.icons8.com/ios-glyphs/90/FFFFFF/linkedin.png" alt="Linkedin"/>
          </a>
          <a href="https://dev.to/kecbm" target="_blank" rel="noopener noreferrer">
            <img width="50" height="50" src="https://img.icons8.com/windows/96/FFFFFF/dev.png" alt="Dev.to"/>
          </a>
        </div>

        <div>
          <h3>Repositório</h3>
          <a href="https://github.com/zanfranceschi/rinha-de-backend-2023-q3" target="_blank" rel="noopener noreferrer">
            <img width="50" height="50" src="https://img.icons8.com/ios-glyphs/90/FFFFFF/github.png" alt="github"/>
          </a>
        </div>

        <div>
          <h3>Live</h3>
          <img width="50" height="50" src="https://img.icons8.com/ios-glyphs/90/FFFFFF/youtube--v1.png" alt="youtube--v1"/>
        </div>

        <div>
          <h1 id="icon-chicken-footer">🐓</h1>
        </div>
      </footer>
    </div>
  );
}

export default App;
