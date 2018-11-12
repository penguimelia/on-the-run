import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Start from './Start.js';
import Game from './Game.js';
import Howtoplay from './Howtoplay.js';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Fragment>
        <Route path="/" exact component={Start} />
        <Route path="/game" component={Game} />
        <Route path="/howtoplay" component={Howtoplay} />
        </Fragment>
      </Router>
    );
  }
}

export default App;
