import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CatFactsApp = () => {
  const [catFacts, setCatFacts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCatFacts = async () => {
      try {
        const response = await axios.get('https://cat-fact.herokuapp.com/facts');
        setCatFacts(response.data);
      } catch (error) {
        console.error('Error fetching cat facts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCatFacts();
  }, []);

  const handlePreviousClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : catFacts.length - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex < catFacts.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <div className="App">
      <h1>Cat Facts App</h1>
      {loading ? (
        <p>Loading cat facts...</p>
      ) : (
        <div>
          <p>{catFacts[currentIndex].text}</p>
          <p>Fact {currentIndex + 1} of {catFacts.length}</p>

          <button onClick={handlePreviousClick} disabled={catFacts.length === 1}>
            Previous Fact
          </button>
          <button onClick={handleNextClick} disabled={catFacts.length === 1}>
            Next Fact
          </button>
        </div>
      )}
    </div>
  );
};

export default CatFactsApp;