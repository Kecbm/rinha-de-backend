import React, { useState, useEffect } from 'react';

function Card(props) {
  const [userRepository, setUserRepository] = useState(null);

  console.log('userFork: ', props.userFork);

  useEffect(() => {
    async function fetchUserRepository() {
      try {
        const repoUrl = `https://api.github.com/repos/${props.userLogin}/rinha-de-backend`;
        const response = await fetch(repoUrl);
        const repositoryData = await response.json();

        setUserRepository(repositoryData);
        console.log('userRepository: ', userRepository);
      } catch (error) {
        console.error('Erro ao buscar informações do repositório: ', error);
      }
    }

    fetchUserRepository();
  }, [props.userLogin]);

  if(props.userFork !== null) {
    return (
        <div>
          <p>Informações do fork:</p>
          <p>Usuário do fork:</p>
          {/* Renderizar mais informações do fork aqui */}
        </div>
    );
  }

  if(userRepository !== null) {
    return (
        <div>
          <p>Informações da API do GitHub:</p>
          <p>Nome do repositório: {userRepository.name}</p>
          <p>Descrição: {userRepository.description}</p>
          {/* Renderizar mais informações da API aqui */}
        </div>
    );
  }
}

export default Card;
