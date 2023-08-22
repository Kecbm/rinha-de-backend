import React, { useState, useEffect } from 'react';

function App() {
  const [forks, setForks] = useState([]);

  useEffect(() => {
    async function fetchLanguages(userLogin) {
      try {
        const userLanguagesUrl = `https://api.github.com/repos/${userLogin}/rinha-de-backend-2023-q3/languages`;
        const response = await fetch(userLanguagesUrl);
        const languagesData = await response.json();
        return languagesData;
      } catch (error) {
        console.log('Erro ao buscar as linguagens: ', error);
      }
    }

    async function fetchForks() {
      try {
        // OBS.: Adicionar meu token pessoal do GitHub para aumentar o número de requisições para a API deles
        const repoUrl = 'https://api.github.com/repos/zanfranceschi/rinha-de-backend-2023-q3/forks';
        const response = await fetch(repoUrl);
        const forksData = await response.json();
        console.log('forksData: ', forksData);

        const forksNormalized = forksData?.map((fork) => {
          const languages = fetchLanguages(fork.owner.login);
          return {
            ...fork,
            language: languages,
          };
        });

        const normalizedForks = await Promise.all(forksNormalized);

        setForks(normalizedForks);
        console.log('forksNormalized: ', normalizedForks);
      } catch (error) {
        console.error('Erro ao buscar forks: ', error);
      }
    }

    fetchForks();
  }, []);

  return (
    <div>
      <h1>Rinha de Backend 🐓</h1>
      <ul>
        {forks?.map((fork) => (
          <li key={fork.id}>
            <p><strong>{fork.owner.login}</strong></p>
            <p><strong>URL:</strong> <a href={fork.html_url} target="_blank" rel="noopener noreferrer">{fork.html_url}</a></p>
            <p>Linguagens: {fork.language[0]}</p>
            <p>{fork.updated_at}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
