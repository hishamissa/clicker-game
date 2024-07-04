import React, { useEffect, useRef, useState } from 'react';
import './App.css'; 
/* Import the images */
import cheeseImage from './assets/cheese.png'; // Import the cheese image
import upgradesIcon from './assets/cart.png'; // Import the upgrades icon
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
  const [cheeseMakerLevel, setCheeseMakerLevel] = useState(0);
  const [cheeseFactoryLevel, setCheeseFactoryLevel] = useState(0);
  const [artisanCheeseMakerLevel, setArtisanCheeseMakerLevel] = useState(0);
  const [cheeseShopLevel, setCheeseShopLevel] = useState(0);
  const [cheeseExporterLevel, setCheeseExporterLevel] = useState(0);
  const [cheeseResearchLabLevel, setCheeseResearchLabLevel] = useState(0);
  const [cheeseCorporationLevel, setCheeseCorporationLevel] = useState(0);
  const [globalCheeseEnterpriseLevel, setGlobalCheeseEnterpriseLevel] = useState(0);
  const [galacticCheeseConglomerateLevel, setGalacticCheeseConglomerateLevel] = useState(0);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupKey, setPopupKey] = useState(0); // Used to force re-render the popup message
  const [sideBarVisible, setSideBarVisible] = useState(false); 
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [clickCount, setClickCount] = useState(0); 
  const [nextBiteInterval, setNextBiteInterval] = useState(getRandomInterval());

  /* Cheese per Click upgrade settings */
  const cheeseCutterBaseCost = 10;
  const cheeseCutterMultiplier = 1.15;

  /* Cheese per Second upgrade settings */
  const dairyCowBaseCost = 100;
  const dairyCowMultiplier = 1.15;

  const cheeseMakerBaseCost = 500;
  const cheeseMakerMultiplier = 1.25;

  const cheeseFactoryBaseCost = 2000;
  const cheeseFactoryMultiplier = 1.25;

  const artisanCheeseMakerBaseCost = 5000;
  const artisanCheeseMakerMultiplier = 1.35;

  const cheeseShopBaseCost = 10000;
  const cheeseShopMultiplier = 1.35;

  const cheeseExporterBaseCost = 20000;
  const cheeseExporterMultiplier = 1.4;

  const cheeseResearchLabBaseCost = 50000;
  const cheeseResearchLabMultiplier = 1.45;

  const cheeseCorporationBaseCost = 100000;
  const cheeseCorporationMultiplier = 1.5;

  const globalCheeseEnterpriseBaseCost = 2000000;
  const globalCheeseEnterpriseMultiplier = 1.55;

  const galacticCheeseConglomerateBaseCost = 5000000;
  const galacticCheeseConglomerateMultiplier = 1.60;

  const formatNumber = (number) => {
    if (number >= 1000000000) {
      return (number / 1000000000).toFixed(1) + 'B'; //for billions 
    } else if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'M'; //for millions
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'K'; //for thousands
    } else {
      return number;
    }
  };

  /* Function to calculate the scaled cost of the upgrades */
  const getCheeseCutterCost = () => Math.round(cheeseCutterBaseCost * Math.pow(cheeseCutterMultiplier, cheeseCutterLevel));
  const getDairyCowCost = () => Math.round(dairyCowBaseCost * Math.pow(dairyCowMultiplier, dairyCowLevel)); 
  const getCheeseMakerCost = () => Math.round(cheeseMakerBaseCost * Math.pow(cheeseMakerMultiplier, cheeseMakerLevel));
  const getCheeseFactoryCost = () => Math.round(cheeseFactoryBaseCost * Math.pow(cheeseFactoryMultiplier, cheeseFactoryLevel));
  const getArtisanCheeseMakerCost = () => Math.round(artisanCheeseMakerBaseCost * Math.pow(artisanCheeseMakerMultiplier, artisanCheeseMakerLevel));
  const getCheeseShopCost = () => Math.round(cheeseShopBaseCost * Math.pow(cheeseShopMultiplier, cheeseShopLevel));
  const getCheeseExporterCost = () => Math.round(cheeseExporterBaseCost * Math.pow(cheeseExporterMultiplier, cheeseExporterLevel));
  const getCheeseResearchLabCost = () => Math.round(cheeseResearchLabBaseCost * Math.pow(cheeseResearchLabMultiplier, cheeseResearchLabLevel));
  const getCheeseCorporationCost = () => Math.round(cheeseCorporationBaseCost * Math.pow(cheeseCorporationMultiplier, cheeseCorporationLevel));
  const getGlobalCheeseEnterpriseCost = () => Math.round(globalCheeseEnterpriseBaseCost * Math.pow(globalCheeseEnterpriseMultiplier, globalCheeseEnterpriseLevel));
  const getGalacticCheeseConglomerateCost = () => Math.round(galacticCheeseConglomerateBaseCost * Math.pow(galacticCheeseConglomerateMultiplier, galacticCheeseConglomerateLevel));

  /* Function to calculate the total cheese per second */
  const getCheesePerSecond = () => (dairyCowLevel * 0.1) + (cheeseMakerLevel * 0.5) + 
                                  (cheeseFactoryLevel * 2) + (artisanCheeseMakerLevel * 5) + 
                                  (cheeseShopLevel * 10) + (cheeseExporterLevel * 20) + 
                                  (cheeseResearchLabLevel * 50) + (cheeseCorporationLevel * 100) + 
                                  (globalCheeseEnterpriseLevel * 200) + (galacticCheeseConglomerateLevel * 500);

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

  /* Function to buy the cheese maker upgrade */
  const buyCheeseMaker = () => {
    const cost = getCheeseMakerCost();
    if (cheeseCount >= cost) {
      setCheeseCount(cheeseCount - cost);
      setCheeseMakerLevel(cheeseMakerLevel + 1);
      setPopupMessage('+0.5 CHEESE PER SECOND!');
      setPopupKey(Date.now());
      upgradeAudio.currentTime = 0.5;
      upgradeAudio.play();
    }
  };

  /* Function to buy the cheese factory upgrade */
  const buyCheeseFactory = () => {
    const cost = getCheeseFactoryCost();
    if (cheeseCount >= cost) {
      setCheeseCount(cheeseCount - cost);
      setCheeseFactoryLevel(cheeseFactoryLevel + 1);
      setPopupMessage('+2 CHEESE PER SECOND!');
      setPopupKey(Date.now());
      upgradeAudio.currentTime = 0.5;
      upgradeAudio.play();
    }
  };

  /* Function to buy the artisan cheese maker upgrade */
  const buyArtisanCheeseMaker = () => {
    const cost = getArtisanCheeseMakerCost();
    if (cheeseCount >= cost) {
      setCheeseCount(cheeseCount - cost);
      setArtisanCheeseMakerLevel(artisanCheeseMakerLevel + 1);
      setPopupMessage('+5 CHEESE PER SECOND!');
      setPopupKey(Date.now());
      upgradeAudio.currentTime = 0.5;
      upgradeAudio.play();
    }
  };

  /* Function to buy the cheese shop upgrade */
  const buyCheeseShop = () => {
    const cost = getCheeseShopCost();
    if (cheeseCount >= cost) {
      setCheeseCount(cheeseCount - cost);
      setCheeseShopLevel(cheeseShopLevel + 1);
      setPopupMessage('+10 CHEESE PER SECOND!');
      setPopupKey(Date.now());
      upgradeAudio.currentTime = 0.5;
      upgradeAudio.play();
    }
  };

  /* Function to buy the cheese exporter upgrade */
  const buyCheeseExporter = () => {
    const cost = getCheeseExporterCost();
    if (cheeseCount >= cost) {
      setCheeseCount(cheeseCount - cost);
      setCheeseExporterLevel(cheeseExporterLevel + 1);
      setPopupMessage('+20 CHEESE PER SECOND!');
      setPopupKey(Date.now());
      upgradeAudio.currentTime = 0.5;
      upgradeAudio.play();
    }
  };

  /* Function to buy the cheese research lab upgrade */
  const buyCheeseResearchLab = () => {
    const cost = getCheeseResearchLabCost();
    if (cheeseCount >= cost) {
      setCheeseCount(cheeseCount - cost);
      setCheeseResearchLabLevel(cheeseResearchLabLevel + 1);
      setPopupMessage('+50 CHEESE PER SECOND!');
      setPopupKey(Date.now());
      upgradeAudio.currentTime = 0.5;
      upgradeAudio.play();
    }
  };

  /* Function to buy the cheese corporation upgrade */
  const buyCheeseCorporation = () => {
    const cost = getCheeseCorporationCost();
    if (cheeseCount >= cost) {
      setCheeseCount(cheeseCount - cost);
      setCheeseCorporationLevel(cheeseCorporationLevel + 1);
      setPopupMessage('+100 CHEESE PER SECOND!');
      setPopupKey(Date.now());
      upgradeAudio.currentTime = 0.5;
      upgradeAudio.play();
    }
  };

  /* Function to buy the global cheese enterprise upgrade */
  const buyGlobalCheeseEnterprise = () => {
    const cost = getGlobalCheeseEnterpriseCost();
    if (cheeseCount >= cost) {
      setCheeseCount(cheeseCount - cost);
      setGlobalCheeseEnterpriseLevel(globalCheeseEnterpriseLevel + 1);
      setPopupMessage('+200 CHEESE PER SECOND!');
      setPopupKey(Date.now());
      upgradeAudio.currentTime = 0.5;
      upgradeAudio.play();
    }
  };

  /* Function to buy the galactic cheese conglomerate upgrade */
  const buyGalacticCheeseConglomerate = () => {
    const cost = getGalacticCheeseConglomerateCost();
    if (cheeseCount >= cost) {
      setCheeseCount(cheeseCount - cost);
      setGalacticCheeseConglomerateLevel(galacticCheeseConglomerateLevel + 1);
      setPopupMessage('+500 CHEESE PER SECOND!');
      setPopupKey(Date.now());
      upgradeAudio.currentTime = 0.5;
      upgradeAudio.play();
    }
  };

  /* UseEffect hook to generate cheese per second */
  useEffect(() => {
    let interval;
    if (dairyCowLevel > 0) {
      interval = setInterval(() => {
        /* Generate 0.1 cheese per second for each dairy cow */
        setCheeseCount((prevCheeseCount) => prevCheeseCount + (0.1 * dairyCowLevel) + (0.5 * cheeseMakerLevel) + 
                                                              (2 * cheeseFactoryLevel) + (5 * artisanCheeseMakerLevel) + 
                                                              (10 * cheeseShopLevel) + (20 * cheeseExporterLevel) + 
                                                              (50 * cheeseResearchLabLevel) + (100 * cheeseCorporationLevel) + 
                                                              (200 * globalCheeseEnterpriseLevel) + (500 * galacticCheeseConglomerateLevel));
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
    <div className={`App-container ${sideBarVisible ? 'sidebar-open' : ''}`}>
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
            <div className="upgrade-details">
              <span className="upgrade-name">Cheese Cutter</span>
              <span className="upgrade-level">Level {cheeseCutterLevel}</span>
              <span className="upgrade-cost">{getCheeseCutterCost()} 🧀</span>
            </div>
          </button>
          <button
            className="upgrade-button text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            /* Buy the dairy cow upgrade when clicked */
            onClick={buyDairyCow}
            /* Disable the button if the player doesn't have enough cheese */
            disabled={cheeseCount < getDairyCowCost()}
          >
            <div className="upgrade-details">
              <span className="upgrade-name">Dairy Cow</span>
              <span className="upgrade-level">Level {dairyCowLevel}</span>
              <span className="upgrade-cost">{getDairyCowCost()} 🧀</span>
            </div>
          </button>
          <button
            className="upgrade-button text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            /* Buy the cheese maker upgrade when clicked */
            onClick={buyCheeseMaker}
            /* Disable the button if the player doesn't have enough cheese */
            disabled={cheeseCount < getCheeseMakerCost()}
          >
            <div className="upgrade-details">
              <span className="upgrade-name">Cheese Maker</span>
              <span className="upgrade-level">Level {cheeseMakerLevel}</span>
              <span className="upgrade-cost">{getCheeseMakerCost()} 🧀</span>
            </div>
          </button>
          <button
            className="upgrade-button text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            /* Buy the cheese factory upgrade when clicked */
            onClick={buyCheeseFactory}
            /* Disable the button if the player doesn't have enough cheese */
            disabled={cheeseCount < getCheeseFactoryCost()}
          >
            <div className="upgrade-details">
              <span className="upgrade-name">Cheese Factory</span>
              <span className="upgrade-level">Level {cheeseFactoryLevel}</span>
              <span className="upgrade-cost">{formatNumber(getCheeseFactoryCost())} 🧀</span>
            </div>
          </button>
          <button
            className="upgrade-button text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            /* Buy the artisan cheese maker upgrade when clicked */
            onClick={buyArtisanCheeseMaker}
            /* Disable the button if the player doesn't have enough cheese */
            disabled={cheeseCount < getArtisanCheeseMakerCost()}
          >
            <div className="upgrade-details">
              <span className="upgrade-name">Artisan Maker</span>
              <span className="upgrade-level">Level {artisanCheeseMakerLevel}</span>
              <span className="upgrade-cost">{formatNumber(getArtisanCheeseMakerCost())} 🧀</span>
            </div>
          </button>
          <button
            className="upgrade-button text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            /* Buy the cheese shop upgrade when clicked */
            onClick={buyCheeseShop}
            /* Disable the button if the player doesn't have enough cheese */
            disabled={cheeseCount < getCheeseShopCost()}
          >
            <div className="upgrade-details">
              <span className="upgrade-name">Cheese Shop</span>
              <span className="upgrade-level">Level {cheeseShopLevel}</span>
              <span className="upgrade-cost">{formatNumber(getCheeseShopCost())} 🧀</span>
            </div>
          </button>  
          <button
            className="upgrade-button text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            /* Buy the cheese exporter upgrade when clicked */
            onClick={buyCheeseExporter}
            /* Disable the button if the player doesn't have enough cheese */
            disabled={cheeseCount < getCheeseExporterCost()}
          >
            <div className="upgrade-details">
              <span className="upgrade-name">Cheese Exporter</span>
              <span className="upgrade-level">Level {cheeseExporterLevel}</span>
              <span className="upgrade-cost">{formatNumber(getCheeseExporterCost())} 🧀</span>
            </div>
          </button>
          <button
            className="upgrade-button text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            /* Buy the cheese research lab upgrade when clicked */
            onClick={buyCheeseResearchLab}
            /* Disable the button if the player doesn't have enough cheese */
            disabled={cheeseCount < getCheeseResearchLabCost()}
          >
            <div className="upgrade-details">
              <span className="upgrade-name">Research Lab</span>
              <span className="upgrade-level">Level {cheeseResearchLabLevel}</span>
              <span className="upgrade-cost">{formatNumber(getCheeseResearchLabCost())} 🧀</span>
            </div>
          </button>
          <button
            className="upgrade-button text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            /* Buy the cheese corporation upgrade when clicked */
            onClick={buyCheeseCorporation}
            /* Disable the button if the player doesn't have enough cheese */
            disabled={cheeseCount < getCheeseCorporationCost()}
          >
            <div className="upgrade-details">
              <span className="upgrade-name">Cheese Corp</span>
              <span className="upgrade-level">Level {cheeseCorporationLevel}</span>
              <span className="upgrade-cost">{formatNumber(getCheeseCorporationCost())} 🧀</span>
            </div>
          </button>
          <button
            className="upgrade-button text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            /* Buy the global cheese enterprise upgrade when clicked */
            onClick={buyGlobalCheeseEnterprise}
            /* Disable the button if the player doesn't have enough cheese */
            disabled={cheeseCount < getGlobalCheeseEnterpriseCost()}
          >
            <div className="upgrade-details">
              <span className="upgrade-name">Global Cheese</span>
              <span className="upgrade-level">Level {globalCheeseEnterpriseLevel}</span>
              <span className="upgrade-cost">{formatNumber(getGlobalCheeseEnterpriseCost())} 🧀</span>
            </div>
          </button>
          <button
            className="upgrade-button text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            /* Buy the galactic cheese conglomerate upgrade when clicked */
            onClick={buyGalacticCheeseConglomerate}
            /* Disable the button if the player doesn't have enough cheese */
            disabled={cheeseCount < getGalacticCheeseConglomerateCost()}
          >
            <div className="upgrade-details">
              <span className="upgrade-name">Galactic Cheese</span>
              <span className="upgrade-level">Level {galacticCheeseConglomerateLevel}</span>
              <span className="upgrade-cost">{formatNumber(getGalacticCheeseConglomerateCost())} 🧀</span>
            </div>
          </button>
        </div>
        <div className="App-content">
          {/* Header section */}
          <header className="App-header w-full">
            {/* Sidebar (purchases) button */}
            <button className={`toggle-button fixed top-5 ${sideBarVisible ? 'left-60' : 'left-5'} z-50`} 
                    /* Toggle the sidebar visibility when clicked */
                    onClick={toggleSideBar}>
                    {/* Upgrades icon that reveals sidebar */}
                    <img src={upgradesIcon} alt="Upgrades" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20" />
            </button>
            {/* Title of the game */}
            <h1 className="cheese-title">Cheese Clicker</h1>
            {/* Cheese container/image */}
            <div className="cheese-container mt-4" onClick={handleClick}>
              <img src={cheeseImage} alt="Cheese" className="cheese-image w-64 h-64 sm:w-64 sm:h-64 md:w-64 m:h-64 lg:w-64 lg:h-64 xl:w-64 xl:h-64" />
            </div>
            {/* Cheese count */}
            <p className="cheese-count text-4xl sm:text-5xl md:text-5xl lg:text-5xl mt-4">🧀 {cheeseCount.toFixed(1)}</p>
            {/* Cheese stats */}
            <div className="cheese-stats flex items-center text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl">
              <p className="cheese-per-click flex items-center text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl">CHeeSE PER CLICK: {cheesePerClick}</p>
              <p className="cheese-per-second ml-0 md:ml-5 flex items-center text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl">CHeeSe PeR SeCoND: {getCheesePerSecond().toFixed(1)}</p>
            </div>
            {/* Popup message */}
            {popupMessage && <div key={popupKey} className="popup-message">{popupMessage}</div>}
          </header>
        </div>
    </div>
  );
}

/* Export the App component */
export default App;
