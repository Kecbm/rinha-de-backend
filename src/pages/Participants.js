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
              <h1 className="participant-position">{user.position}</h1>
              <a href={`https://github.com/${user.login}`} target="_blank" rel="noopener noreferrer">
                <img src={`https://github.com/${user.login}.png`} alt={`Foto do usuário ${user.login}`} className="img-participant" />
              </a>
              <a href={`https://github.com/${user.login}`} target="_blank" rel="noopener noreferrer" className="participant-login">
                {user.login}
              </a>
              <div className="participant-infos">
                <p>
                  <img width="35" height="35" src="https://img.icons8.com/ios-filled/50/03a3b7/code-file.png" alt="code-file" className="card-participant-icon"/>{user.language}
                </p>
                <p>
                  <img width="35" height="35" src="https://img.icons8.com/ios-filled/50/03a3b7/user-group-man-man.png" alt="user-group-man-man" className="card-participant-icon"/><strong>Contagem de pessoas:</strong> {user.peopleCount}
                </p>
                <p>
                  <img width="35" height="35" src="https://img.icons8.com/ios-filled/50/03a3b7/statistics--v1.png" alt="statistics--v1" className="card-participant-icon"/><strong>P99:</strong> {user.p99}
                </p>
              </div>
            </div>
            ))
        )
      }
    </div>
  );
}

export default Participants;
