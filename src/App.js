import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Participants from './pages/Participants';
import Podium from './pages/Podium';
import Winner from './pages/Winner';
import Languages from './pages/Languages';
import Forks from './pages/Forks';
import Footer from './components/Footer';
import './css/App.css';

function App() {
  const [forks, setForks] = useState([]);

  useEffect(() => {
    async function fetchAllForks() {
      try {
        const repoUrl = 'https://api.github.com/repos/zanfranceschi/rinha-de-backend-2023-q3/forks';
        var page = 1;
        var allForks = [];
    
        while (true) {
          const response = await fetch(`${repoUrl}?page=${page}`);
          const forksData = await response.json();
    
          if (forksData.length === 0) {
            break;
          }
  
          page++;
    
          allForks = allForks.concat(forksData);
        }
  
        allForks.sort((a, b) => a.owner.login.localeCompare(b.owner.login));
  
        setForks(allForks);
      } catch (error) {
        console.error('Erro ao buscar forks: ', error);
      }
    }
  
    fetchAllForks();
  }, []);

  return (
    <div>
      <Header />
        <Routes>
          <Route
            exact path="/"
            element={<Participants forks={forks} />}
          />
          <Route
            exact path="/podium"
            element={<Podium />}
          />
          <Route
            exact path="/winner"
            element={<Winner forks={forks} />}
          />
          <Route
            exact path="/languages"
            element={<Languages />}
          />
          <Route
            exact path="/forks"
            element={<Forks forks={forks} />}
          />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
