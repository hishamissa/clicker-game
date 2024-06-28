import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import cheeseImage from './assets/cheese.png'; // Import the cheese image
import upgradesIcon from './assets/upgrades.ico'; // Import the upgrades icon
import backgroundMusic from './sounds/music.mp3'; // Import the beep sound
import clickSound from './sounds/click.mp3'; // Import the click sound
import bite from './sounds/bite.mp3'; // Import the bite sound
import upgradeSound from './sounds/upgrade.mp3'; // Import the upgrade sound

function App() {
  const [cheeseCount, setCheeseCount] = useState(0);
  const [cheesePerClick, setCheesePerClick] = useState(1);
  const [cheeseCutterLevel, setCheeseCutterLevel] = useState(0);
  const [dairyCowLevel, setDairyCowLevel] = useState(0);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupKey, setPopupKey] = useState(0); // Used to force re-render the popup message

  const [sideBarVisible, setSideBarVisible] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [nextBiteInterval, setNextBiteInterval] = useState(getRandomInterval());


  const cheeseCutterBaseCost = 10;
  const cheeseCutterMultiplier = 1.15;

  const dairyCowBaseCost = 100;
  const dairyCowMultiplier = 1.15;

  const getCheeseCutterCost = () => Math.round(cheeseCutterBaseCost * Math.pow(cheeseCutterMultiplier, cheeseCutterLevel));
  const getDairyCowCost = () => Math.round(dairyCowBaseCost * Math.pow(dairyCowMultiplier, dairyCowLevel));
  const getCheesePerSecond = () => dairyCowLevel * 0.1;

  /* Audio settings */
  const music = new Audio(backgroundMusic);
  music.volume = 0.2;
  const clickAudio = new Audio(clickSound);
  clickAudio.volume = 1;
  const biteAudio = new Audio(bite);
  biteAudio.volume = 0.7;
  const upgradeAudio = new Audio(upgradeSound);
  upgradeAudio.volume = 1;


  function getRandomInterval() {
    const intervals = [3, 4, 5, 6, 7, 8];
    return intervals[Math.floor(Math.random() * intervals.length)];
  }

  const handleClick = () => {
    if (!audioPlayed) {
      music.currentTime = 1;
      music.play();
      music.loop = true;
      setAudioPlayed(true);
    }
    setClickCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount % nextBiteInterval === 0) {
        biteAudio.play();
        setNextBiteInterval(getRandomInterval());
      } else {
        clickAudio.play();
      }
      return newCount;
    });
    setCheeseCount(cheeseCount + cheesePerClick);
    const cheeseImg = document.querySelector('.cheese-image');
    cheeseImg.classList.add('bounce');
    setTimeout(() => {
      cheeseImg.classList.remove('bounce');
    }, 100);
  };

  /* Function to buy the cheese cutter upgrade */
  const buyCheeseCutter = () => {
    const cost = getCheeseCutterCost();
    if (cheeseCount >= cost) { /* Check if the player has enough cheese to buy the upgrade */
      setCheeseCount(cheeseCount - cost); /* Deduct the cost from the cheese count */
      setCheesePerClick(cheesePerClick + 1); /* Increase the cheese per click by 1 */
      setCheeseCutterLevel(cheeseCutterLevel + 1); /* Increase the cheese cutter level */
      setPopupKey(Date.now()); /* Update the popup key to force re-render the popup message */
      setPopupMessage('+1 CHEESE PER CLICK!'); /* Display the popup message */
      upgradeAudio.currentTime = 0.5; /* Start the audio from the middle */
      upgradeAudio.play(); /* Play the purchase audio */
    }
  };

  const buyDairyCow = () => {
    const cost = getDairyCowCost();
    if (cheeseCount >= cost) {
      setCheeseCount(cheeseCount - cost);
      setDairyCowLevel(dairyCowLevel + 1);
      setPopupMessage('+0.1 CHEESE PER SECOND!');
      setPopupKey(Date.now());
      upgradeAudio.currentTime = 0.5; /* Start the audio from the middle */
      upgradeAudio.play(); /* Play the purchase audio */
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
          <h2 className = "upgrades">Upgrades</h2>  
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
        <h1 className="cheese-title text-8xl sm:text-8xl md:text-8xl lg:text-8xl xl:text-8xl">Cheese Clicker</h1>
        <div className="cheese-stats flex items-center text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl">
          <p className="cheese-per-click flex items-center text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl">CHeeSE PER CLICK: {cheesePerClick}</p>
          <p className="cheese-per-second ml-0 md:ml-5 flex items-center text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl">CHeeSe PeR SeCoND: {getCheesePerSecond().toFixed(1)}</p>
        </div>
        <div className="cheese-container mt-4" onClick={handleClick}>
        {popupMessage && <div key={popupKey} className="popup-message">{popupMessage}</div>}
          <img src={cheeseImage} alt="Cheese" className="cheese-image w-64 h-64 sm:w-64 sm:h-64 md:w-64 m:h-64 lg:w-64 lg:h-64 xl:w-64 xl:h-64" />
        </div>
        <p className="cheese-count text-4xl sm:text-5xl md:text-5xl lg:text-5xl mt-4">🧀 {cheeseCount.toFixed(1)}</p>
      </header>
    </div>
  );
}

export default App;