import React, { useEffect, useRef, useState } from 'react';
import './App.css'; 
import AppContent from './AppContent';
/* Import the audio files */
import backgroundMusic from './sounds/music.mp3';
import clickSound from './sounds/click.mp3'; 
import bite from './sounds/bite.mp3'; 
import upgradeSound from './sounds/upgrade.mp3'; 
import saveSound from './sounds/save.mp3';
import wooshSound from './sounds/woosh.mp3';

const music = new Audio(backgroundMusic); 
music.volume = 0.2; // Set the volume of the background music to 20%
music.loop = true; // Loop the background music

/* Main App component */
function App() {
  const savedVolume = localStorage.getItem('cheeseClickerVolume'); // Get the saved volume from local storage
  const [volume, setVolume] = useState(savedVolume ? parseInt(savedVolume, 10) : 50); // Default volume set to 50%
  const [cheeseCount, setCheeseCount] = useState(0); // Initialize the cheese count state
  const [cheesePerClick, setCheesePerClick] = useState(1); // Initialize the cheese per click state

  /* Initialize the upgrades and their levels */
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
  const [cheeseGodLevel, setCheeseGodLevel] = useState(0);
  const [galacticCheeseConglomerateLevel, setGalacticCheeseConglomerateLevel] = useState(0);

  const [popupMessage, setPopupMessage] = useState(''); // Initialize the popup message state
  const [popupKey, setPopupKey] = useState(0); // Used to force re-render the popup message
  const [sideBarVisible, setSideBarVisible] = useState(false); // Initialize the sidebar visibility state
  const clickCount = useRef(0); // Initialize the click count ref
  const [audioPlayed, setAudioPlayed] = useState(false); // Initialize the audio played state
  const [nextBiteInterval, setNextBiteInterval] = useState(getRandomInterval()); 
  const [isAutoSaveEnabled, setIsAutoSaveEnabled] = useState(false); // State to enable/disable autosaving
  const [showAutosavePopup, setShowAutosavePopup] = useState(false); // State to show the autosave notification
  const [showSaveNotification, setShowSaveNotification] = useState(false); // State to show the save notification
  const [infoVisible, setInfoVisible] = useState(false); // State to show the info modal

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
  const cheeseGodBaseCost = 100000000;
  const cheeseGodMultiplier = 2;

  /* Function to format the cheese upgrade costs to short forms */
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

  /* Function to format the total cheese count for readability */
  const formatCheeseCount = (number) => {
    if (number >= 1000) {
      return number.toLocaleString('en-US', { minimumFractionDigits: 1 });
    } else if (number >= 10000) {
      return number.toLocaleString('en-US', { maximumFractionDigits: 0 });
    } else {
      return number.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    }
  };

  /* Functions to calculate the scaled cost of the upgrades */
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
  const getCheeseGodCost = () => Math.round(cheeseGodBaseCost * Math.pow(cheeseGodMultiplier, cheeseGodLevel));

  /* Function to calculate the total cheese per second */
  const getCheesePerSecond = () => (dairyCowLevel * 0.1) + (cheeseMakerLevel * 0.5) + 
                                  (cheeseFactoryLevel * 2) + (artisanCheeseMakerLevel * 5) + 
                                  (cheeseShopLevel * 10) + (cheeseExporterLevel * 20) + 
                                  (cheeseResearchLabLevel * 50) + (cheeseCorporationLevel * 100) + 
                                  (globalCheeseEnterpriseLevel * 200) + (galacticCheeseConglomerateLevel * 500) +
                                  (cheeseGodLevel * 100000);

  /* Audio settings */
  const clickAudio = new Audio(clickSound);
  clickAudio.volume = 1; 
  const biteAudio = new Audio(bite);
  biteAudio.volume = 0.7; 
  const upgradeAudio = new Audio(upgradeSound);
  upgradeAudio.volume = 1;
  const saveAudio = new Audio(saveSound);
  saveAudio.volume = 1; 
  const wooshAudio = new Audio(wooshSound);
  wooshAudio.volume = 1;

  /* Function to get a random interval for the bite sound */
  function getRandomInterval() {
    const intervals = [1, 2]; 
    return intervals[Math.floor(Math.random() * intervals.length)]; // Return a random interval from the intervals array
  }

  /* Function to handle the volume change event in the settings*/
  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    music.volume = newVolume / 100;
  };

  /* Function to handle the cheese click event */
  const handleClick = () => {
    /* Play the background music */
    if (!audioPlayed) {
      music.currentTime = 1;
      music.play();
      setAudioPlayed(true);
      music.loop = true;
    }
    /* Play the click sound when clicked */
    const newCount = clickCount + 1;
    if (newCount % nextBiteInterval === 0) {
      biteAudio.play(); 
      setNextBiteInterval(getRandomInterval());
    } else {
        clickAudio.play();
      }
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
    if (cheeseCount >= cost) {
      setCheeseCount(cheeseCount - cost);
      setDairyCowLevel(dairyCowLevel + 1);
      setPopupMessage('+0.1 CHEESE PER SECOND!');
      setPopupKey(Date.now());
      upgradeAudio.currentTime = 0.5;
      upgradeAudio.play();
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

  /* Function to buy the cheese god upgrade */
  const buyCheeseGod = () => {
    const cost = getCheeseGodCost();
    if (cheeseCount >= cost) {
      setCheeseCount(cheeseCount - cost);
      setCheeseGodLevel(cheeseGodLevel + 1);
      setPopupMessage('+100000 CHEESE PER SECOND!');
      setPopupKey(Date.now());
      upgradeAudio.currentTime = 0.5;
      upgradeAudio.play();
    }
  };

  /* Function to save the game state to local storage */
  const saveGame = () => {
    const gameState = {
      cheeseCount,
      cheesePerClick,
      cheeseCutterLevel,
      dairyCowLevel,
      cheeseMakerLevel,
      cheeseFactoryLevel,
      artisanCheeseMakerLevel,
      cheeseShopLevel,
      cheeseExporterLevel,
      cheeseResearchLabLevel,
      cheeseCorporationLevel,
      globalCheeseEnterpriseLevel,
      galacticCheeseConglomerateLevel,
      cheeseGodLevel
    };
    localStorage.setItem('cheeseClickerGameState', JSON.stringify(gameState)); // Save the game state to local storage
    setShowSaveNotification(true);
    saveAudio.play(); // Play the save audio
    setTimeout(() => {
      setShowSaveNotification(false);
    }, 3000); // Hide the save notification after 3 seconds
  };

  /* Function to load the game state from local storage */
  const loadGame = () => {
    const savedGameState = JSON.parse(localStorage.getItem('cheeseClickerGameState'));
    if (savedGameState) {
      setCheeseCount(savedGameState.cheeseCount);
      setCheesePerClick(savedGameState.cheesePerClick);
      setCheeseCutterLevel(savedGameState.cheeseCutterLevel);
      setDairyCowLevel(savedGameState.dairyCowLevel);
      setCheeseMakerLevel(savedGameState.cheeseMakerLevel);
      setCheeseFactoryLevel(savedGameState.cheeseFactoryLevel);
      setArtisanCheeseMakerLevel(savedGameState.artisanCheeseMakerLevel);
      setCheeseShopLevel(savedGameState.cheeseShopLevel);
      setCheeseExporterLevel(savedGameState.cheeseExporterLevel);
      setCheeseResearchLabLevel(savedGameState.cheeseResearchLabLevel);
      setCheeseCorporationLevel(savedGameState.cheeseCorporationLevel);
      setGlobalCheeseEnterpriseLevel(savedGameState.globalCheeseEnterpriseLevel);
      setGalacticCheeseConglomerateLevel(savedGameState.galacticCheeseConglomerateLevel);
      setCheeseGodLevel(savedGameState.cheeseGodLevel);
    }
  };

  /* Function to restart the game */
  const restartGame = () => {
    setCheeseCount(0);
    setCheesePerClick(1);
    setCheeseCutterLevel(0);
    setDairyCowLevel(0);
    setCheeseMakerLevel(0);
    setCheeseFactoryLevel(0);
    setArtisanCheeseMakerLevel(0);
    setCheeseShopLevel(0);
    setCheeseExporterLevel(0);
    setCheeseResearchLabLevel(0);
    setCheeseCorporationLevel(0);
    setGlobalCheeseEnterpriseLevel(0);
    setGalacticCheeseConglomerateLevel(0);
    setCheeseGodLevel(0);
    localStorage.removeItem('cheeseClickerGameState');
  };

  /* UseEffect hook to load the game */
  useEffect(() => {
    loadGame();
  }, []);

  /* UseEffect hook to enable autosaving */
  useEffect(() => {
    let autoSaveInterval;
    if (isAutoSaveEnabled) {
      autoSaveInterval = setInterval(() => {
        saveGame();
      }, 300000); // Save the game every 5 minutes
      setShowAutosavePopup(true);
      setTimeout(() => {
        setShowAutosavePopup(false);
      }, 3000);
    }
    return () => clearInterval(autoSaveInterval);
  }, [isAutoSaveEnabled]);

  /* UseEffect hook to control the volume of the music */
  useEffect(() => {
    music.volume = volume / 100;
  }, [volume]);

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
                                                              (200 * globalCheeseEnterpriseLevel) + (500 * galacticCheeseConglomerateLevel) +
                                                              (100000 * cheeseGodLevel));
      }, 1000); // Generate 0.1 cheese per second
    }
    /* Clear the interval when the component is unmounted */
    return () => clearInterval(interval);
  }, [dairyCowLevel]);

  /* Function to toggle the sidebar visibility */
  const toggleSideBar = () => {
    /* Toggle the visibility of the sidebar */
    setSideBarVisible(!sideBarVisible);
    wooshAudio.currentTime = 0.27;
    wooshAudio.play(); // Play the woosh audio
  };

  /* Function to check if an upgrade is available */
  const isUpgradeAvailable = () => {
    const upgradeCosts = [
      getCheeseCutterCost(),
      getDairyCowCost(),
      getCheeseMakerCost(),
      getCheeseFactoryCost(),
      getArtisanCheeseMakerCost(),
      getCheeseShopCost(),
      getCheeseExporterCost(),
      getCheeseResearchLabCost(),
      getCheeseCorporationCost(),
      getGlobalCheeseEnterpriseCost(),
      getGalacticCheeseConglomerateCost(),
      getCheeseGodCost()
    ];
    return upgradeCosts.some(cost => cheeseCount >= cost);
  };

  const shouldHightlight = !sideBarVisible && isUpgradeAvailable();
  const [settingsVisible, setSettingsVisible] = useState(false);

  /* Function to toggle the settings visibility */
  const toggleSettings = () => {
    setSettingsVisible(!settingsVisible);
    wooshAudio.currentTime = 0.27;
    wooshAudio.play();
  };

  /* Function to toggle the info modal */
  const toggleInfo = () => {
    setInfoVisible(!infoVisible);
    wooshAudio.currentTime = 0.27;
    wooshAudio.play();
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
    <AppContent 
      cheeseCount={cheeseCount}
      cheesePerClick={cheesePerClick}
      getCheesePerSecond={getCheesePerSecond}
      buyCheeseCutter={buyCheeseCutter}
      getCheeseCutterCost={getCheeseCutterCost}
      cheeseCutterLevel={cheeseCutterLevel}
      buyDairyCow={buyDairyCow}
      getDairyCowCost={getDairyCowCost}
      dairyCowLevel={dairyCowLevel}
      buyCheeseMaker={buyCheeseMaker}
      getCheeseMakerCost={getCheeseMakerCost}
      cheeseMakerLevel={cheeseMakerLevel}
      buyCheeseFactory={buyCheeseFactory}
      getCheeseFactoryCost={getCheeseFactoryCost}
      cheeseFactoryLevel={cheeseFactoryLevel}
      buyArtisanCheeseMaker={buyArtisanCheeseMaker}
      getArtisanCheeseMakerCost={getArtisanCheeseMakerCost}
      artisanCheeseMakerLevel={artisanCheeseMakerLevel}
      buyCheeseShop={buyCheeseShop}
      getCheeseShopCost={getCheeseShopCost}
      cheeseShopLevel={cheeseShopLevel}
      buyCheeseExporter={buyCheeseExporter}
      getCheeseExporterCost={getCheeseExporterCost}
      cheeseExporterLevel={cheeseExporterLevel}
      buyCheeseResearchLab={buyCheeseResearchLab}
      getCheeseResearchLabCost={getCheeseResearchLabCost}
      cheeseResearchLabLevel={cheeseResearchLabLevel}
      buyCheeseCorporation={buyCheeseCorporation}
      getCheeseCorporationCost={getCheeseCorporationCost}
      cheeseCorporationLevel={cheeseCorporationLevel}
      buyGlobalCheeseEnterprise={buyGlobalCheeseEnterprise}
      getGlobalCheeseEnterpriseCost={getGlobalCheeseEnterpriseCost}
      globalCheeseEnterpriseLevel={globalCheeseEnterpriseLevel}
      buyGalacticCheeseConglomerate={buyGalacticCheeseConglomerate}
      getGalacticCheeseConglomerateCost={getGalacticCheeseConglomerateCost}
      galacticCheeseConglomerateLevel={galacticCheeseConglomerateLevel}
      buyCheeseGod={buyCheeseGod}
      getCheeseGodCost={getCheeseGodCost}
      cheeseGodLevel={cheeseGodLevel}
      formatCheeseCount={formatCheeseCount}
      popupMessage={popupMessage}
      popupKey={popupKey}
      showSaveNotification={showSaveNotification}
      sideBarVisible={sideBarVisible}
      shouldHightlight={shouldHightlight}
      toggleSideBar={toggleSideBar}
      saveGame={saveGame}
      toggleSettings={toggleSettings}
      settingsVisible={settingsVisible}
      handleVolumeChange={handleVolumeChange}
      volume={volume}
      restartGame={restartGame}
      isAutoSaveEnabled={isAutoSaveEnabled}
      setIsAutoSaveEnabled={setIsAutoSaveEnabled}
      showAutosavePopup={showAutosavePopup}
      toggleInfo={toggleInfo}
      infoVisible={infoVisible}
      handleClick={handleClick}
      formatNumber={formatNumber}
    />
  );
}

/* Export the App component */
export default App;
