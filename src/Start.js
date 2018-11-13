import React from 'react';

import Runner from './img/runner.gif'

class Start extends React.Component {
  constructor(props) {
    super(props);

    document.addEventListener('keydown', this.handleKeyPress, false);
  }

  handleKeyPress = (event) => {
    if (event.key === ' ') {
      this.startGame();
    } else if (event.key === 'h') {
      this.toHelp();
    }
  }

  startGame(){
    this.props.history.push('/game')
  }

  toHelp() {
    this.props.history.push('/howtoplay')
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress, false);
  }

  render() {
    return (<div className="main landing">
        <h1 className="title">On the Run</h1>
        <img className="titleImg" src={Runner} alt="runner" width="250" height="250"/>
        <button className="start" onClick={() => {this.startGame()}}>Click to Start (space)</button>
        <button className="start" onClick={() => {this.toHelp()}}>(H)ow to Play</button>
      </div>);
  }
}

export default Start;
