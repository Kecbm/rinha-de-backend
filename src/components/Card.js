import React, { useState, useEffect } from 'react';

function Card({ userFork }) {
  const [userRepository, setUserRepository] = useState(null);

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
        }
      } catch (error) {
        console.error('Erro ao buscar repositórios do usuário: ', error);
      }
    }

    fetchUserRepositories(userFork);
  }, [userFork]);

  if (userRepository) {
    return (
      <div>
        <p>Informações dos repositórios do usuário:</p>
        <p>Linguagem: {userRepository.language}</p>
        <p><strong>Link para o Repositório:</strong> <a href={userRepository.html_url} target="_blank" rel="noopener noreferrer">{userRepository.html_url}</a></p>
        <p><strong>Criado em:</strong> {userRepository.created_at}</p>
        <p><strong>Última Atualização:</strong> {userRepository.updated_at}</p>
        <p><strong>Clone URL:</strong> {userRepository.clone_url}</p>
      </div>
    );
  }

  // if (userFork !== null) {
  //   return (
  //     <div>
  //       <p>Informações do fork:</p>
  //       {/* Renderizar mais informações do fork aqui */}
  //     </div>
  //   );
  // }

  // return <div>Carregando...</div>;
}

export default Card;
