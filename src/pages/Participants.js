import React, { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import usersRanking from '../data/usersRanking';
import '../css/Participants.css';

function Participants() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
        setIsLoading(false);
    }, 3500); 
  }, []);

  return (
    <div id="participants">
      {
        isLoading ? (<Loading />) : (
            usersRanking.map((user) => (
            <div key={user.id} className="card-participant">
              <h1>{user.position}</h1>
              <a href={`https://github.com/${user.login}`} target="_blank" rel="noopener noreferrer">
                <img src={`https://github.com/${user.login}.png`} alt={`Foto do usuário ${user.login}`} className="img-participant" />
              </a>
              <a href={`https://github.com/${user.login}`} target="_blank" rel="noopener noreferrer" className="participant-login">
                {user.login}
              </a>
              <div className="participant-infos">
                <p>
                  <strong>Contagem de pessoas:</strong> {user.peopleCount}
                </p>
                <p>
                  <strong>P99:</strong> {user.p99}
                </p>
                <p>{user.language}</p>
              </div>
            </div>
            ))
        )
      }
    </div>
  );
}

export default Participants;
