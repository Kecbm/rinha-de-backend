import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import Card from '../components/Card';
import '../css/Forks.css';

function Forks({ forks }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showCardForUser, setShowCardForUser] = useState({});

  useEffect(() => {
    setTimeout(() => {
        setIsLoading(false);
    }, 3500); 
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
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div id="home-content">
          {forks && forks.map((fork) => (
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
      )}
    </div>
  );
}

export default Forks;
