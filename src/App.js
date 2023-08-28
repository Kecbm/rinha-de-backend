import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Card from './components/Card';
import Footer from './components/Footer';
import './css/App.css'

function App() {
  const [forks, setForks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCardForUser, setShowCardForUser] = useState({});

  useEffect(() => {
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
      <Header />
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
      <Footer />
    </div>
  );
}

export default App;
