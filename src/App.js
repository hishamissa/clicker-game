import React, { useEffect, useState } from 'react';
import './App.css';
import cheeseImage from './cheese.png'; // Import the cheese image

function App() {
  const [cheeseCount, setCheeseCount] = useState(0);
  const [cheesePerClick, setCheesePerClick] = useState(1);
  const [cheeseCutterBought, setCheeseCutterBought] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleClick = () => {
    setCheeseCount(cheeseCount + cheesePerClick);
  };

  const buyCheeseCutter = () => {
    if (cheeseCount >= 10 && !cheeseCutterBought) {
      setCheeseCount(cheeseCount - 10);
      setCheesePerClick(cheesePerClick + 1);
      setCheeseCutterBought(true);
      setPopupMessage('+1 Cheese per Click!');
    }
  };

  useEffect(() => {
    if (popupMessage) {
      const timer = setTimeout(() => setPopupMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [popupMessage]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="cheese-title">Cheese Clicker</h1>
        <p className="cheese-per-click">Cheese per Click: {cheesePerClick}</p>
        <div className="cheese-container" onClick={handleClick}>
        {popupMessage && <div className="popup-message">{popupMessage}</div>}
          <img src={cheeseImage} alt="Cheese" className="cheese-image" />
        </div>
        <p className="cheese-count">Cheese: {cheeseCount}</p>
        <div className="upgrades">
          <button
            className="upgrade-button"
            onClick={buyCheeseCutter}
            disabled={cheeseCount < 10 || cheeseCutterBought}
          >
            Buy Cheese Cutter (10 Cheese)
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
