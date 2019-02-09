import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WorldMap from './worldMap/worldMap';
import Fade from 'react-reveal/Fade';

class App extends Component {
  render() {
    return (
      <div className="App">
      <div className="container-fluid">
      <div className="row mx-auto">
      <div className="col-12 mx-auto">
      <header>
        <h1 className="header p-3 text-center">World value survey</h1>
      </header>
      </div>
      </div>
      </div>
      <Fade delay={500}>
        <WorldMap />
        </Fade>
      </div>
    );
  }
}

export default App;
