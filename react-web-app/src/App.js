import React, { Component } from 'react';
import './css/App.css';

import Footer from './components/Footer.js';
import Header from './components/Header.js';
import SpiderGraph from './components/SpiderGraph.js';

class App extends Component {
  render() {
  
    return (
      <div classsName="App">
        <Header />
        <SpiderGraph />
        <Footer />
      </div>
    );
  }
}

export default App;
