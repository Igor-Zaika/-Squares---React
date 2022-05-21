import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './app/app';

import './index.scss';

const initialWidth = 4;
const initialHeight = 4;
const cellSize = 50;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App initialWidth={initialWidth} initialHeight={initialHeight} cellSize={cellSize}/>
  </React.StrictMode>
);

