import React from 'react';
import podiumRanking from '../data/podiumRanking';
import '../css/Winner.css';

// {
//     position: 1,
//     login: 'viniciusfonseca',
//     peopleCount: 44936,
//     p99: 17418,
//     language: 'Rust'
// }

function Winner({ forks }) {
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
            podiumRanking.map((user, index) => (
                <div key={index} id="card-winner">
                    <p><strong>VENCEDOR</strong></p>
                    <a href={`https://github.com/${user.login}`} target="_blank" rel="noopener noreferrer">
                        <img src={userWinner.owner.avatar_url} alt={user.login}  id="winner-img" />
                    </a>
                    <a href={`https://github.com/${user.login}`} target="_blank" rel="noopener noreferrer" id="winner-login">
                        {user.login}
                    </a>
                    <div id="winner-infos">
                        <p><strong>{user.language}</strong></p>
                        <p><strong>Contagem de pessoas:</strong> {user.peopleCount}</p>
                        <p><strong>P99:</strong> {user.p99}</p>
                    </div>
                </div>
            ))
        }
    </div>
  );
}

export default Winner;
