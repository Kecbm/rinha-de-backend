import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import podiumRanking from '../data/podiumRanking';
import '../css/Winner.css';

function Winner({ forks }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
        setIsLoading(false);
    }, 3500); 
  }, []);

  const winnerData = podiumRanking[0];
  console.log('winnerData: ', winnerData);
  const userLogin = podiumRanking[0].login;

  const searchUserData = (userLogin) => {
    const userFork = forks.find((fork) => fork.owner.login === userLogin);

    return userFork;
  };

  const userWinner = searchUserData(userLogin);
  console.log('userWinner: ', userWinner);

  return (
    <div id="winner">
      {
        isLoading ? (<Loading />) : (
          <div key={winnerData.login} id="card-winner">
            <div id="trophy">
              <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/trophy.png" alt="trophy" />
            </div>
            <a href={`https://github.com/${winnerData.login}`} target="_blank" rel="noopener noreferrer">
              <img src={userWinner.owner.avatar_url} alt={winnerData.login}  id="winner-img" />
            </a>
            <a href={`https://github.com/${winnerData.login}`} target="_blank" rel="noopener noreferrer" id="winner-login">
              {winnerData.login}
            </a>
            <div id="winner-infos">
              <p>
                <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/896c0a/code-file.png" alt="code-file"/>
                <strong>{winnerData.language}</strong>
              </p>
              <p>
                <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/896c0a/user-group-man-man.png" alt="user-group-man-man"/>
                <strong>Contagem de pessoas:</strong> {winnerData.peopleCount}
              </p>
              <p>
                <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/896c0a/statistics--v1.png" alt="statistics--v1"/>
                <strong>P99:</strong> {winnerData.p99}
              </p>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default Winner;
