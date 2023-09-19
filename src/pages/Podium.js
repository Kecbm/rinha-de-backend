import React, { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import usersRanking from '../data/usersRanking';
import '../css/Podium.css';

function Podium() {
  const [isLoading, setIsLoading] = useState(true);
  const podiumUsers = usersRanking.slice(0, 10);

  useEffect(() => {
    setTimeout(() => {
        setIsLoading(false);
    }, 3500); 
  }, []);

  return (
    <div id="podium">
      {
        isLoading ? (<Loading />) : (
            podiumUsers.map((user) => (
            <div key={user.id} className="card-podium">
              <h1 className="podium-position">{user.position}</h1>
              <a href={`https://github.com/${user.login}`} target="_blank" rel="noopener noreferrer">
                <img src={`https://github.com/${user.login}.png`} alt={`Foto do usuário ${user.login}`} className="img-podium" />
              </a>
              <a href={`https://github.com/${user.login}`} target="_blank" rel="noopener noreferrer" className="podium-login">
                {user.login}
              </a>
              <div className="podium-infos">
                <p>
                  <img width="35" height="35" src={user.iconColor ? `https://img.icons8.com/ios-filled/50/${user.iconColor}/code-file.png` : "https://img.icons8.com/ios-filled/50/03a3b7/code-file.png"} alt="code-file" className="card-podium-icon"/>{user.language}
                </p>
                <p>
                  <img width="35" height="35" src={user.iconColor ? `https://img.icons8.com/ios-filled/50/${user.iconColor}/user-group-man-man.png` : "https://img.icons8.com/ios-filled/50/03a3b7/user-group-man-man.png"} alt="user-group-man-man" className="card-podium-icon"/><strong>Contagem de pessoas:</strong> {user.peopleCount}
                </p>
                <p>
                  <img width="35" height="35" src={user.iconColor ? `https://img.icons8.com/ios-filled/50/${user.iconColor}/statistics--v1.png` : "https://img.icons8.com/ios-filled/50/03a3b7/statistics--v1.png"} alt="statistics--v1" className="card-podium-icon"/><strong>P99:</strong> {user.p99}
                </p>
              </div>
            </div>
            ))
        )
      }
    </div>
  );
}

export default Podium;
