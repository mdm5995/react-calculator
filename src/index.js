import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// FCC test stuff
import { render } from 'react-dom';

render(<App />, document.getElementById('root'));
// end FCC test stuff

/* React 18 code that fails FCC tests 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
*/
