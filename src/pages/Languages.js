import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import languagesRanking from '../data/languagesRanking';
import '../css/Languages.css';

function Languages() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
        setIsLoading(false);
    }, 3500); 
  }, []);

  return (
    <div id="languages-content">
      {isLoading ? (
        <Loading />
      ) : (
        <div id="languages">
          { 
            languagesRanking.map((language, index) => (
              <div key={index} className={`${index < 3 ? "top-languages" : "language-card"}`}>
                <h1 className={`${index < 3 ? "top-languages-position" : "language-position"}`}>{language.position} º</h1>
                <img src={language.image} alt={language.name} className={`${index < 3 ? "top-languages-image" : "language-image"}`}/>
                <h2 className={`${index < 3 ? "top-languages-name" : "language-name"}`}>{language.name}</h2>
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
}

export default Languages;
