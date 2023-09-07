import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import usersRanking from '../data/usersRanking';
import '../css/Participants.css';

// {
//   position: 1,
//   login: 'viniciusfonseca',
//   peopleCount: 44936,
//   p99: 17418,
//   language: 'Rust'
// }

function Participants({ forks }) {
  const [isLoading, setIsLoading] = useState(true);
  console.log('forks: ', forks);

  useEffect(() => {
    setTimeout(() => {
        setIsLoading(false);
    }, 5000); 
  }, []);

  const usersRankingNormalized = usersRanking.map((user) => {
    const userFork = forks.find((fork) => fork.owner.login === user.login);

    return {
      ...user,
      userFork
    };
  });
  
  console.log('usersRankingNormalized: ', usersRankingNormalized);

  return (
    <div id="participants">
      {isLoading ? (
        <Loading />
      ) : (
        <div id="home-content">
        {usersRankingNormalized.map((user) => (
          <div key={user.position} className="card-user">
            <a href={user.userFork.owner.html_url} target="_blank" rel="noopener noreferrer">
              <img src={user.userFork.owner.avatar_url} alt={user.userFork.owner.login}  className="user-img" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="user-login">
              {user.login}
            </a>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}

export default Participants;
