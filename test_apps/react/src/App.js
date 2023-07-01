import logo from './logo.svg';
import './App.css';

import { BrowserRouter } from 'react-router-dom';
import { WorkerStorage }from 'worker-storage';

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
  const runTest = async () => {
    const storage = new WorkerStorage();
    console.log('here');

    await storage.setItem('test', 'hello world');
    await storage.setItem('test2', {hello: ['world']});

    console.log('all', await storage.getItem('test'));
    console.log('all', await storage.getItem('test2'));

    await storage.removeItem('test');

    console.log('test deleted', await storage.getItem('test'));
    console.log('test deleted', await storage.getItem('test2'));

    await storage.clear();

    console.log('cleared', await storage.getItem('test'));
    console.log('cleared', await storage.getItem('test2'));
  };

  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <h1>Web Worker Test App</h1>
        <button onClick={runTest}>Run Test</button>
      </header>
    </div>
  );
}

