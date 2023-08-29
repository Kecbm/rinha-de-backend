import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Forks from './pages/Forks';
import Prizes from './pages/Prizes';
import './css/App.css'

function App() {
  return (
    <div>
      <Header />
        <Routes>
          <Route exact path="/prizes" element={<Prizes />} />
          <Route exact path="/forks" element={<Forks />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
