import React, { useEffect, useState } from 'react';
import './App.css';
import cheeseImage from './cheese.png'; // Import the cheese image
import upgradesIcon from './upgrades.ico'; // Import the upgrades icon

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
  const getCheesePerSecond = () => dairyCowLevel * 0.1;

  const handleClick = () => {
    setCheeseCount(cheeseCount + cheesePerClick);
    const cheeseImg = document.querySelector('.cheese-image');
    cheeseImg.classList.add('bounce');
    setTimeout(() => {
      cheeseImg.classList.remove('bounce');
    }, 100);
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
    <div className="App min-h-screen flex flex-col items-center justify-center p-4">
      <header className="App-header w-full">
        <button className={`toggle-button fixed top-5 ${sideBarVisible ? 'left-60' : 'left-5'} z-50`} 
                onClick={toggleSideBar}>
                <img src={upgradesIcon} alt="Upgrades" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20" />
        </button>
        <div className ={`sidebar ${sideBarVisible ? 'visible' : ''}`}>
          <h2 className="p-2">Upgrades</h2>  
          <button
            className="upgrade-button text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            onClick={buyCheeseCutter}
            disabled={cheeseCount < getCheeseCutterCost()}
          >
            Buy Cheese Cutter ({getCheeseCutterCost()} Cheese)
          </button>
          <button
            className="upgrade-button text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            onClick={buyDairyCow}
            disabled={cheeseCount < getDairyCowCost()}
          >
            Buy Dairy Cow ({getDairyCowCost()} Cheese)
          </button>
        </div>
        <h1 className="cheese-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">Cheese Clicker</h1>
        <div className="cheese-stats flex items-center text-lg sm:text-xl md:text-2xl lg:text-3xl">
          <p className="cheese-per-click flex items-center text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">Cheese per Click: {cheesePerClick}</p>
          <p className="cheese-per-second ml-0 md:ml-4 flex items-center text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">Cheese per Second: {getCheesePerSecond().toFixed(1)}</p>
        </div>
        <div className="cheese-container mt-4" onClick={handleClick}>
        {popupMessage && <div className="popup-message">{popupMessage}</div>}
          <img src={cheeseImage} alt="Cheese" className="cheese-image w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64" />
        </div>
        <p className="cheese-count text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-4">🧀 = {cheeseCount.toFixed(1)}</p>
      </header>
    </div>
  );
}

export default App;
