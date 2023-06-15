import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GameModeContext } from "./Context/GameModeContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GameModeContext>
  <App />
  </GameModeContext>
);

