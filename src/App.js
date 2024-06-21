import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Clicker Game</h1>
      <button
        className="px-6 py-2 text-lg bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleClick}
      >
        Click me!
      </button>
      <p className="mt-4 text-2xl">Count: {count}</p>
    </div>
  );
}

export default App;

