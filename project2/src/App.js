import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WorldMap from './worldMap/worldMap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <WorldMap />
      </div>
    );
  }
}

export default App;
