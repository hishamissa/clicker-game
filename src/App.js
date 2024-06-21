import React, { useEffect, useState } from 'react';
import './App.css';
import cheeseImage from './cheese.png'; // Import the cheese image

function App() {
  const [cheeseCount, setCheeseCount] = useState(0);
  const [cheesePerClick, setCheesePerClick] = useState(1);
  const [cheeseCutterLevel, setCheeseCutterLevel] = useState(0);
  const [dairyCowLevel, setDairyCowLevel] = useState(0);
  const [popupMessage, setPopupMessage] = useState('');
  const [sideBarVisible, setSideBarVisible] = useState(false);

  const cheeseCutterBaseCost = 10;
  const cheeseCutterMultiplier = 1.15;

  const dairyCowBaseCost = 100;
  const dairyCowMultiplier = 1.15;

  const getCheeseCutterCost = () => Math.round(cheeseCutterBaseCost * Math.pow(cheeseCutterMultiplier, cheeseCutterLevel));
  const getDairyCowCost = () => Math.round(dairyCowBaseCost * Math.pow(dairyCowMultiplier, dairyCowLevel));

  const handleClick = () => {
    setCheeseCount(cheeseCount + cheesePerClick);
  };

  const buyCheeseCutter = () => {
    const cost = getCheeseCutterCost();
    if (cheeseCount >= cost) {
      setCheeseCount(cheeseCount - cost);
      setCheesePerClick(cheesePerClick + 1);
      setCheeseCutterLevel(cheeseCutterLevel + 1);
      setPopupMessage('+1 Cheese per Click!');
    }
  };

  const buyDairyCow = () => {
    const cost = getDairyCowCost();
    if (cheeseCount >= cost) {
      setCheeseCount(cheeseCount - cost);
      setDairyCowLevel(dairyCowLevel + 1);
      setPopupMessage('+0.1 Cheese per Second!');
    }
  };

  useEffect(() => {
    let interval;
    if (dairyCowLevel > 0) {
      interval = setInterval(() => {
        setCheeseCount((prevCheeseCount) => prevCheeseCount + 0.1 * dairyCowLevel);
      }, 1000); // Generate 0.1 cheese per second
    }
    return () => clearInterval(interval);
  }, [dairyCowLevel]);

  const toggleSideBar = () => {
    setSideBarVisible(!sideBarVisible);
  };

  useEffect(() => {
    if (popupMessage) {
      const timer = setTimeout(() => setPopupMessage(''), 3000); // Clear the popup message after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [popupMessage]);

  return (
    <div className="App">
      <header className="App-header">
        <button className={`toggle-button ${sideBarVisible ? 'button-visible' : ''}`} onClick={toggleSideBar}>
          {sideBarVisible ? 'Upgrades' : 'Upgrades'}
        </button>
        <div className={`sidebar ${sideBarVisible ? 'visible' : ''}`}>
          <h2>Upgrades</h2>  
          <button
            className="upgrade-button"
            onClick={buyCheeseCutter}
            disabled={cheeseCount < getCheeseCutterCost()}
          >
            Buy Cheese Cutter ({getCheeseCutterCost()} Cheese)
          </button>
          <button
            className="upgrade-button"
            onClick={buyDairyCow}
            disabled={cheeseCount < getDairyCowCost()}
          >
            Buy Dairy Cow ({getDairyCowCost()} Cheese)
          </button>
        </div>
        <h1 className="cheese-title">Cheese Clicker</h1>
        <p className="cheese-per-click">Cheese per Click: {cheesePerClick}</p>
        <div className="cheese-container" onClick={handleClick}>
        {popupMessage && <div className="popup-message">{popupMessage}</div>}
          <img src={cheeseImage} alt="Cheese" className="cheese-image" />
        </div>
        <p className="cheese-count">🧀 = {cheeseCount.toFixed(1)}</p>
      </header>
    </div>
  );
}

export default App;
