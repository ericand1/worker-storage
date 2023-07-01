import logo from './logo.svg';
import './App.css';

import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as worker from 'worker-storage';

export default function ExampleApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

/**
 * Functional component that makes up this example app and renders the UI.
 * This component, called "App", is instantiated (invoked) from the main entry point of the app, index.js.
 * 
 */
function App() {
  /**
   * Initializes the SDK when the app loads.
   */
  useEffect(() => {
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <h1>Web Worker Test App</h1>
      </header>
    </div>
  );
}

