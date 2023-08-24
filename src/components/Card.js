import React, { useState, useEffect } from 'react';

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
    return (<h1>Carregando ... 🐥🐤</h1>)
  }

  const dateBrasilian = (isoDateString) => {
    const isoDate = new Date(isoDateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const brasilFormattedDate = isoDate.toLocaleDateString('pt-BR', options);
    return brasilFormattedDate;
  }

  if (userRepository) {
    return (
      <div>
        <div>
          <p>Informações dos repositórios do usuário</p>
          <p>
            <strong>Link para o Repositório:</strong>{' '}
            <a
              href={userRepository.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {userRepository.html_url}
            </a>
          </p>
          <p>
            <strong>Criado em:</strong> {dateBrasilian(userRepository.created_at)}
          </p>
          <p>
            <strong>Última Atualização:</strong> {dateBrasilian(userRepository.updated_at)}
          </p>
          <p>
            <strong>Clone URL:</strong>{' '}
            <a
              href={userRepository.clone_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {userRepository.clone_url}
            </a>
          </p>
        </div>
      </div>
    );
  }

  if (userFork) {
    return (
      <div>
        <h1>UserFork</h1>
        <p>
          <strong>Link para o Repositório:</strong>{' '}
          <a
            href={userFork.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {userFork.html_url}
          </a>
        </p>
        <p>
          <strong>Criado em:</strong> {dateBrasilian(userFork.created_at)}
        </p>
        <p>
          <strong>Última Atualização:</strong> {dateBrasilian(userFork.updated_at)}
        </p>
        <p>
          <strong>Clone URL:</strong>{' '}
          <a
            href={userFork.clone_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {userFork.clone_url}
          </a>
        </p>
      </div>
    );
  }
}

export default Card;
