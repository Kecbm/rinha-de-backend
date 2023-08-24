import React, { useState, useEffect } from 'react';

function Card(props) {
  const [userRepository, setUserRepository] = useState(null);

  console.log('userFork: ', props.userFork);

  useEffect(() => {
    // async function fetchUserRepository() {
    //   try {
    //     const repoUrl = `https://api.github.com/repos/${props.userLogin}/rinha-de-backend-2023-q3`;
    //     const response = await fetch(repoUrl);
    //     const repositoryData = await response.json();

    //     setUserRepository(repositoryData);
    //     console.log('userRepository: ', userRepository);
    //   } catch (error) {
    //     console.error('Erro ao buscar informações do repositório: ', error);
    //   }
    // }

    async function fetchUserRepository() {
      try {
        const searchQuery = encodeURIComponent(`rinha-de-backend`);
        const repoUrl = `https://api.github.com/search/repositories?q=${searchQuery}+user:${props.userLogin}`;
        const response = await fetch(repoUrl);
        const searchData = await response.json();
    
        if (searchData.items.length > 0) {
          // Supondo que você deseje pegar o primeiro repositório encontrado
          const repositoryUrl = searchData.items[0].url;
          const repositoryResponse = await fetch(repositoryUrl);
          const repositoryData = await repositoryResponse.json();
    
          setUserRepository(repositoryData);
          console.log('userRepository: ', userRepository);
        } else {
          console.log('Nenhum repositório correspondente encontrado');
        }
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
