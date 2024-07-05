import React from 'react';
import cheeseImage from './assets/cheese.png';
import upgradesIcon from './assets/cart.png';
import saveIcon from './assets/diskette.png';
import settingsIcon from './assets/settings.png';
import infoIcon from './assets/information.png';

const AppContent = ({
  cheeseCount,
  cheesePerClick,
  getCheesePerSecond,
  buyCheeseCutter,
  getCheeseCutterCost,
  cheeseCutterLevel,
  buyDairyCow,
  getDairyCowCost,
  dairyCowLevel,
  buyCheeseMaker,
  getCheeseMakerCost,
  cheeseMakerLevel,
  buyCheeseFactory,
  getCheeseFactoryCost,
  cheeseFactoryLevel,
  buyArtisanCheeseMaker,
  getArtisanCheeseMakerCost,
  artisanCheeseMakerLevel,
  buyCheeseShop,
  getCheeseShopCost,
  cheeseShopLevel,
  buyCheeseExporter,
  getCheeseExporterCost,
  cheeseExporterLevel,
  buyCheeseResearchLab,
  getCheeseResearchLabCost,
  cheeseResearchLabLevel,
  buyCheeseCorporation,
  getCheeseCorporationCost,
  cheeseCorporationLevel,
  buyGlobalCheeseEnterprise,
  getGlobalCheeseEnterpriseCost,
  globalCheeseEnterpriseLevel,
  buyGalacticCheeseConglomerate,
  getGalacticCheeseConglomerateCost,
  galacticCheeseConglomerateLevel,
  buyCheeseGod,
  getCheeseGodCost,
  cheeseGodLevel,
  formatCheeseCount,
  popupMessage,
  popupKey,
  showSaveNotification,
  sideBarVisible,
  shouldHightlight,
  toggleSideBar,
  saveGame,
  toggleSettings,
  settingsVisible,
  handleVolumeChange,
  volume,
  restartGame,
  isAutoSaveEnabled,
  setIsAutoSaveEnabled,
  showAutosavePopup,
  toggleInfo,
  infoVisible,
  handleClick,
  formatNumber
}) => {
  return (
    // Add the sidebar-open class to the App-container div when the sidebar is visible
    <div className={`App-container ${sideBarVisible ? 'sidebar-open' : ''}`}>
      <div className={`sidebar ${sideBarVisible ? 'visible' : ''}`}>
        <h2 className="upgrades">Upgrades</h2>
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
            onClick={buyDairyCow}
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
            onClick={buyCheeseMaker}
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
            onClick={buyCheeseFactory}
            disabled={cheeseCount < getCheeseFactoryCost()}
          >
            <div className="upgrade-details">
              <span className="upgrade-name">Cheese Shop</span>
              <span className="upgrade-level">Level {cheeseFactoryLevel}</span>
              <span className="upgrade-cost">{formatNumber(getCheeseFactoryCost())} 🧀</span>
            </div>
          </button>
          <button
            className="upgrade-button text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            onClick={buyArtisanCheeseMaker}
            disabled={cheeseCount < getArtisanCheeseMakerCost()}
          >
            <div className="upgrade-details">
              <span className="upgrade-name">Cheese Connoisseur</span>
              <span className="upgrade-level">Level {artisanCheeseMakerLevel}</span>
              <span className="upgrade-cost">{formatNumber(getArtisanCheeseMakerCost())} 🧀</span>
            </div>
          </button>
          <button
            className="upgrade-button text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            onClick={buyCheeseShop}
            disabled={cheeseCount < getCheeseShopCost()}
          >
            <div className="upgrade-details">
              <span className="upgrade-name">Cheese Factory</span>
              <span className="upgrade-level">Level {cheeseShopLevel}</span>
              <span className="upgrade-cost">{formatNumber(getCheeseShopCost())} 🧀</span>
            </div>
          </button>  
          <button
            className="upgrade-button text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            onClick={buyCheeseExporter}
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
            onClick={buyCheeseResearchLab}
            disabled={cheeseCount < getCheeseResearchLabCost()}
          >
            <div className="upgrade-details">
              <span className="upgrade-name">Cheese Research</span>
              <span className="upgrade-level">Level {cheeseResearchLabLevel}</span>
              <span className="upgrade-cost">{formatNumber(getCheeseResearchLabCost())} 🧀</span>
            </div>
          </button>
          <button
            className="upgrade-button text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            onClick={buyCheeseCorporation}
            disabled={cheeseCount < getCheeseCorporationCost()}
          >
            <div className="upgrade-details">
              <span className="upgrade-name">Cheese Inc.</span>
              <span className="upgrade-level">Level {cheeseCorporationLevel}</span>
              <span className="upgrade-cost">{formatNumber(getCheeseCorporationCost())} 🧀</span>
            </div>
          </button>
          <button
            className="upgrade-button text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            onClick={buyGlobalCheeseEnterprise}
            disabled={cheeseCount < getGlobalCheeseEnterpriseCost()}
          >
            <div className="upgrade-details">
              <span className="upgrade-name">Cheese Enterprise</span>
              <span className="upgrade-level">Level {globalCheeseEnterpriseLevel}</span>
              <span className="upgrade-cost">{formatNumber(getGlobalCheeseEnterpriseCost())} 🧀</span>
            </div>
          </button>
          <button
            className="upgrade-button text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            onClick={buyGalacticCheeseConglomerate}
            disabled={cheeseCount < getGalacticCheeseConglomerateCost()}
          >
            <div className="upgrade-details">
              <span className="upgrade-name">Galactic Cheese</span>
              <span className="upgrade-level">Level {galacticCheeseConglomerateLevel}</span>
              <span className="upgrade-cost">{formatNumber(getGalacticCheeseConglomerateCost())} 🧀</span>
            </div>
          </button>
          <button
            className="upgrade-button text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            onClick={buyCheeseGod}
            disabled={cheeseCount < getCheeseGodCost()}
          >
            <div className="upgrade-details">
              <span className="upgrade-name">Cheese GOD</span>
              <span className="upgrade-level">Level {cheeseGodLevel}</span>
              <span className="upgrade-cost">{formatNumber(getCheeseGodCost())} 🧀</span>
            </div>
          </button>
      </div>
      <div className="App-content">
        <header className="App-header w-full">
          <div className="button-column fixed top-5 left-5 z-50 flex flex-col">
            <button className={`toggle-button fixed top-5 ${sideBarVisible ? 'left-60' : 'left-5'} z-50`} onClick={toggleSideBar}>
              <img src={upgradesIcon} alt="Upgrades" className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 ${shouldHightlight ? 'highlight' : ''}`} />
            </button>
            <button className={`save-button fixed top-5 ${sideBarVisible ? 'left-60' : 'left-5'} z-50`} onClick={saveGame}>
              <img src={saveIcon} alt="Save" className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-15 lg:h-15 xl:w-18 xl:h-18`} />
            </button>
            <button className={`settings-button fixed top-5 ${sideBarVisible ? 'left-60' : 'left-5'} z-50`} onClick={toggleSettings}>
              <img src={settingsIcon} alt="Settings" className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-15 lg:h-15 xl:w-18 xl:h-18`} />
            </button>
            <button className={`info-button fixed top-5 ${sideBarVisible ? 'left-60' : 'left-5'} z-50`} onClick={toggleInfo}>
              <img src={infoIcon} alt="Info" className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-18 xl:h-18`} />
            </button>
          </div>
          <h1 className="cheese-title">Cheese Clicker</h1>
          <div className="cheese-container mt-4" onClick={handleClick}>
            <img src={cheeseImage} alt="Cheese" className="cheese-image w-64 h-64 sm:w-64 sm:h-64 md:w-64 m:h-64 lg:w-64 lg:h-64 xl:w-64 xl:h-64" />
          </div>
          <p className="cheese-count text-4xl sm:text-5xl md:text-5xl lg:text-5xl mt-4">🧀 {formatCheeseCount(cheeseCount)}</p>
          <div className="cheese-stats flex items-center text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl">
            <p className="cheese-per-click flex items-center text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl">CHeeSE PER CLICK: {cheesePerClick}</p>
            <p className="cheese-per-second ml-0 md:ml-5 flex items-center text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl">CHeeSe PeR SeCoND: {getCheesePerSecond().toFixed(1)}</p>
          </div>
          {popupMessage && <div key={popupKey} className="popup-message">{popupMessage}</div>}
          {showSaveNotification && <div className="save-notification">Game saved!</div>}
        </header>
      </div>
      {settingsVisible && (
        <div className="settings-modal">
          <h2>Settings</h2>
          <button className="close-button" onClick={toggleSettings}>X</button>
          <div className="volume-slider-container">
            <label htmlFor="volume-slider">MUSIC VOLUME</label>
            <input type="range" id="volume-slider" className="volume-slider" min="0" max="100" value={volume} onChange={handleVolumeChange} />
            <button className="restart-button mt-4" onClick={restartGame}>RESTART GAME</button>
            <button className={`autosave-button mt-4 ${isAutoSaveEnabled ? 'enabled' : 'disabled'}`} onClick={() => setIsAutoSaveEnabled(!isAutoSaveEnabled)}>
              AUTOSAVE: {isAutoSaveEnabled ? 'ON' : 'OFF'}
            </button>
            {showAutosavePopup && <div className="autosave-popup">Autosaves every 5 minutes!</div>}
          </div>
        </div>
      )}
      {infoVisible && (
        <div className="info-modal">
          <h2>INFORMATION</h2>
          <button className="close-button" onClick={toggleInfo}>X</button>
          <p>Welcome to <span className="h3">Cheese Clicker!</span> Click the cheese to earn! Spend your cheese on upgrades to earn more cheese per click and per second. Have fun!
            This game is a fun project created to demonstrate skills in web development.</p>
          <h3>Tools and skills Used</h3>
          <ul>
            <li><span className="glow-effect">HTML | CSS | JavaScript | React | Local Storage | Audio | Animations</span></li>
          </ul>
          <h3>Links</h3>
          <ul>
            <li><a href="https://github.com/hishamissa" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="https://www.hishamissa.com" target="_blank" rel="noopener noreferrer">My Personal Website</a></li>
            <li><a href="https://www.linkedin.com/in/hisham-issaa/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
          <p2>Developed, designed and implemented by Hisham Issa. Hisham Issa 2024 All rights reserved.</p2>
        </div>
      )}
    </div>
  );
};

export default AppContent;
