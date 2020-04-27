import React, { useState } from 'react';
import './App.css';
import Game from './Components/Game'

function App() {
  const [clickHappened, setClickHappened] = useState(false)
  if (clickHappened) {
    return <Game />
  }
  return (
    <div>
      <button
        onClick={ () => setClickHappened(true) }
      >New Game</button>
    </div>
  );
}

export default App;
