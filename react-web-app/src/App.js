import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SpiderGraph from './SpiderGraph.js';

class App extends Component {
  render() {
  
    return (
      <div classsName="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p>
        </p>
        <SpiderGraph />
      </div>
    );
  }
}

export default App;
