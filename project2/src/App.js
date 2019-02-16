import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WorldMap from './worldMap/worldMap';
import Fade from 'react-reveal/Fade';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Fade delay={500}>
        <WorldMap />
        </Fade>
      </div>
    );
  }
}

export default App;
