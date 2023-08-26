import React, { useState, useEffect } from 'react';
import '../css/Card.css';

function Card({ userFork }) {
  const [userRepository, setUserRepository] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log('userFork: ', userFork);

  useEffect(() => {
    async function fetchUserRepositories(userFork) {
      try {
        if (userFork) {
          const userReposUrl = `https://api.github.com/users/${userFork.owner.login}/repos`;
          const response = await fetch(userReposUrl);
          const repositories = await response.json();
    
          const filteredRepos = repositories.find(repo => repo.name.includes('rinha-de-backend'));
    
          console.log('filteredRepos: ', filteredRepos);
          setUserRepository(filteredRepos);

          setTimeout(() => {
            setIsLoading(false);
          }, 1500); 
        }
      } catch (error) {
        console.error('Erro ao buscar repositórios do usuário: ', error);
      }
    }

    fetchUserRepositories(userFork);
  }, [userFork]);

  if (isLoading) {
    return (<h1 id="loading-card">Carregando ... 🐥🐤</h1>)
  }

  const dateBrasilian = (isoDateString) => {
    const isoDate = new Date(isoDateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const brasilFormattedDate = isoDate.toLocaleDateString('pt-BR', options);
    return brasilFormattedDate;
  }

  if (userRepository) {
    return (
      <div className="card-infos">
        <a
          href={userRepository.html_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>
          <img width="35" height="35" src="https://img.icons8.com/3d-fluency/94/folder-invoices--v1.png" alt="folder-invoices--v1" className="card-icon"/><strong>Link do Repositório</strong>
          </p>
        </a>
        <p>
        <img width="35" height="35" src="https://img.icons8.com/3d-fluency/94/restart--v2.png" alt="restart--v2" className="card-icon"/><strong>Última Atualização:</strong> {dateBrasilian(userRepository.updated_at)}
        </p>
        <a
          href={userRepository.clone_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>
          <img width="35" height="35" src="https://img.icons8.com/3d-fluency/94/github.png" alt="github" className="card-icon"/><strong>Clone URL</strong>
          </p>
        </a>
      </div>
    );
  }

  if (userFork) {
    return (
      <div className="card-infos">
        <a
          href={userFork.html_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>
          <img width="35" height="35" src="https://img.icons8.com/3d-fluency/94/folder-invoices--v1.png" alt="folder-invoices--v1" className="card-icon"/><strong>Link do Repositório</strong>
          </p>
        </a>
        <p>
        <img width="35" height="35" src="https://img.icons8.com/3d-fluency/94/restart--v2.png" alt="restart--v2" className="card-icon"/><strong>Última Atualização</strong>{dateBrasilian(userFork.updated_at)}
        </p>
        <a
          href={userFork.clone_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>
          <img width="35" height="35" src="https://img.icons8.com/3d-fluency/94/github.png" alt="github" className="card-icon"/><strong>Clone URL</strong>
          </p>
        </a>
      </div>
    );
  }
}

export default Card;
