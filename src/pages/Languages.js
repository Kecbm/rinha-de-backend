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
    <div id="languages">
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          { 
            languagesRanking.map((language, index) => (
              <div key={index} className="language-card">
                <h2 className="language-position">{language.position}</h2>
                <h1 className="language-name">{language.name}</h1>
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
}

export default Languages;
