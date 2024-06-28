import React, { useEffect, useRef, useState } from 'react';
import './App.css'; 
/* Import the images */
import cheeseImage from './assets/cheese.png'; // Import the cheese image
import upgradesIcon from './assets/upgrades.ico'; // Import the upgrades icon
/* Import the audio files */
import backgroundMusic from './sounds/music.mp3';
import clickSound from './sounds/click.mp3'; 
import bite from './sounds/bite.mp3'; 
import upgradeSound from './sounds/upgrade.mp3'; 

/* Main App component */
function App() {
  const [cheeseCount, setCheeseCount] = useState(0); // Initialize the cheese count state
  const [cheesePerClick, setCheesePerClick] = useState(1); // Initialize the cheese per click state
  const [cheeseCutterLevel, setCheeseCutterLevel] = useState(0);
  const [dairyCowLevel, setDairyCowLevel] = useState(0);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupKey, setPopupKey] = useState(0); // Used to force re-render the popup message
  const [sideBarVisible, setSideBarVisible] = useState(false); 
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [clickCount, setClickCount] = useState(0); 
  const [nextBiteInterval, setNextBiteInterval] = useState(getRandomInterval());

  /* Cheese cutter upgrade settings */
  const cheeseCutterBaseCost = 10;
  const cheeseCutterMultiplier = 1.15;

  /* Dairy cow upgrade settings */
  const dairyCowBaseCost = 100;
  const dairyCowMultiplier = 1.15;

  /* Function to calculate the scaled cost of the upgrades */
  const getCheeseCutterCost = () => Math.round(cheeseCutterBaseCost * Math.pow(cheeseCutterMultiplier, cheeseCutterLevel));
  const getDairyCowCost = () => Math.round(dairyCowBaseCost * Math.pow(dairyCowMultiplier, dairyCowLevel)); 

  /* Function to calculate the total cheese per second */
  const getCheesePerSecond = () => dairyCowLevel * 0.1;

  /* Audio settings */
  const music = new Audio(backgroundMusic); 
  music.volume = 0.2; // Set the volume of the background music to 20%
  const clickAudio = new Audio(clickSound);
  clickAudio.volume = 1; // Set the volume of the click sound to 100%
  const biteAudio = new Audio(bite);
  biteAudio.volume = 0.7; // Set the volume of the bite sound to 70%
  const upgradeAudio = new Audio(upgradeSound);
  upgradeAudio.volume = 1; // Set the volume of the upgrade sound to 100%

  /* Function to get a random interval for the bite sound */
  function getRandomInterval() {
    const intervals = [3, 4, 5, 6, 7, 8]; 
    return intervals[Math.floor(Math.random() * intervals.length)]; // Return a random interval from the intervals array
  }

  /* Function to handle the cheese click event */
  const handleClick = () => {
    /* Play the background music */
    if (!audioPlayed) {
      music.currentTime = 1;
      music.play();
      music.loop = true;
      setAudioPlayed(true);
    }
    /* Play the click sound when clicked */
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
    /* Increase the cheese count by the cheese per click */
    setCheeseCount(cheeseCount + cheesePerClick);
    /* Bounce the cheese image */
    const cheeseImg = document.querySelector('.cheese-image');
    cheeseImg.classList.add('bounce');
    setTimeout(() => {
      cheeseImg.classList.remove('bounce');
    }, 100);
  };

  /* Function to buy the cheese cutter upgrade */
  const buyCheeseCutter = () => {
    const cost = getCheeseCutterCost();
    /* Check if the player has enough cheese to buy the upgrade */
    if (cheeseCount >= cost) {
      /* Deduct the cost of the upgrade from the cheese count */
      setCheeseCount(cheeseCount - cost);
      /* Increase the cheese per click by 1 and increase the level of the upgrade */
      setCheesePerClick(cheesePerClick + 1);
      setCheeseCutterLevel(cheeseCutterLevel + 1);
      /* Display the popup message */
      setPopupKey(Date.now()); 
      setPopupMessage('+1 CHEESE PER CLICK!');
      upgradeAudio.currentTime = 0.5; /* Start the audio from the middle */
      upgradeAudio.play(); /* Play the purchase audio */
    }
  };

  /* Function to buy the dairy cow upgrade */
  const buyDairyCow = () => {
    const cost = getDairyCowCost(); 
    /* Check if the player has enough cheese to buy the upgrade */
    if (cheeseCount >= cost) {
      /* Deduct the cost of the upgrade from the cheese count */
      setCheeseCount(cheeseCount - cost);
      /* Increase the dairy cow level by 1 */
      setDairyCowLevel(dairyCowLevel + 1);
      /* Display the popup message */
      setPopupMessage('+0.1 CHEESE PER SECOND!');
      setPopupKey(Date.now());
      upgradeAudio.currentTime = 0.5; /* Start the audio from the middle */
      upgradeAudio.play(); /* Play the purchase audio */
    }
  };

  /* UseEffect hook to generate cheese per second */
  useEffect(() => {
    let interval;
    if (dairyCowLevel > 0) {
      interval = setInterval(() => {
        /* Generate 0.1 cheese per second for each dairy cow */
        setCheeseCount((prevCheeseCount) => prevCheeseCount + 0.1 * dairyCowLevel);
      }, 1000); // Generate 0.1 cheese per second
    }
    /* Clear the interval when the component is unmounted */
    return () => clearInterval(interval);
  }, [dairyCowLevel]);

  const toggleSideBar = () => {
    /* Toggle the visibility of the sidebar */
    setSideBarVisible(!sideBarVisible);
  };

  /* UseEffect hook to clear the popup message after 3 seconds */
  useEffect(() => {
    if (popupMessage) {
      /* Clear the popup message after 3 seconds */
      const timer = setTimeout(() => setPopupMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [popupMessage]);

  /* Return the JSX */
  return (
    /* Main App container */
    <div className="App min-h-screen flex flex-col items-center justify-center p-4">
      {/* Header section */}
      <header className="App-header w-full">
        {/* Sidebar (purchases) button */}
        <button className={`toggle-button fixed top-5 ${sideBarVisible ? 'left-60' : 'left-5'} z-50`} 
                /* Toggle the sidebar visibility when clicked */
                onClick={toggleSideBar}>
                {/* Upgrades icon that reveals sidebar */}
                <img src={upgradesIcon} alt="Upgrades" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20" />
        </button>
        {/* Sidebar displaying upgrade options */}
        <div className ={`sidebar ${sideBarVisible ? 'visible' : ''}`}>
          <h2 className = "upgrades">Upgrades</h2>
          <button
            className="upgrade-button text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            /* Buy the cheese cutter upgrade when clicked */
            onClick={buyCheeseCutter}
            /* Disable the button if the player doesn't have enough cheese */
            disabled={cheeseCount < getCheeseCutterCost()}
          >
            Buy Cheese Cutter ({getCheeseCutterCost()} Cheese)
          </button>
          <button
            className="upgrade-button text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            /* Buy the dairy cow upgrade when clicked */
            onClick={buyDairyCow}
            /* Disable the button if the player doesn't have enough cheese */
            disabled={cheeseCount < getDairyCowCost()}
          >
            Buy Dairy Cow ({getDairyCowCost()} Cheese)
          </button>
        </div>
        {/* Title of the game */}
        <h1 className="cheese-title text-8xl sm:text-8xl md:text-8xl lg:text-8xl xl:text-8xl">Cheese Clicker</h1>
        {/* Cheese stats */}
        <div className="cheese-stats flex items-center text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl">
          <p className="cheese-per-click flex items-center text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl">CHeeSE PER CLICK: {cheesePerClick}</p>
          <p className="cheese-per-second ml-0 md:ml-5 flex items-center text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl">CHeeSe PeR SeCoND: {getCheesePerSecond().toFixed(1)}</p>
        </div>
        {/* Cheese container/image */}
        <div className="cheese-container mt-4" onClick={handleClick}>
        {popupMessage && <div key={popupKey} className="popup-message">{popupMessage}</div>}
          <img src={cheeseImage} alt="Cheese" className="cheese-image w-64 h-64 sm:w-64 sm:h-64 md:w-64 m:h-64 lg:w-64 lg:h-64 xl:w-64 xl:h-64" />
        </div>
        {/* Cheese count */}
        <p className="cheese-count text-4xl sm:text-5xl md:text-5xl lg:text-5xl mt-4">🧀 {cheeseCount.toFixed(1)}</p>
      </header>
    </div>
  );
}

/* Export the App component */
export default App;
