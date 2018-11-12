import React from 'react';
import { Link } from 'react-router-dom';

import Starts from './startLocations.js'
import Runner from './img/runner2.gif'
import Mafia from './img/mafia.gif'

import Gameover from './Gameover.js'
import getFlights from './functions.js'

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      budget: 200,
      day: 0,
      location: { name: '. . .' },
      options: [],
      gameover: false,
      toggleMenu: false,
      score: 0,
      highscores: []
    }

    this.init();
    document.addEventListener('keydown', this.handleKeyPress, false);
  }

  async init() {
    var startInd = Math.floor(Math.random() * Starts.length);
    var start = Starts[startInd];
    start.risk = parseInt(Math.random() * 100);
    start.return = 10;

    var options = await getFlights(this.state.day, start.code, this.state.budget)

    this.setState({
      location: start,
      options: options
    });
  }

  isCaptured = () => {
    var survival = Math.random() * 100;

    if (survival > this.state.location.risk) {
      // live another day
      return 0;
    } else {
      return 1;
    }
  }

  stay = async () => {
    var fate = this.isCaptured();
    var currentCity = this.state.location;
    var newBudget = this.state.budget + currentCity.return;
    console.log(fate);
    if (!fate) {

      if (currentCity.risk < 90) {
        if (this.state.day === 1 && currentCity.risk < 50) {
          currentCity.risk = 50
        } else if (this.state.day === 1 && currentCity.risk < 80) {
          currentCity.risk = 80
        }

        currentCity.risk += 10;
      } else if (90 < currentCity.risk < 95){
        currentCity.risk = 95;
      } else {
        currentCity.risk = 99;
      }

      this.setState({
        budget: newBudget,
        day: this.state.day + 1,
        location: currentCity,
        options: await getFlights(this.state.day+1, currentCity.code, newBudget)
      })
    } else {
      this.setState({
        gameover: true
      })
    }
  }

  toggleMenu = () => {
    console.log(this.state.toggleMenu);
    this.setState({toggleMenu: !this.state.toggleMenu});
  }

  chooseFlight = async (ind) => {

    var choice = this.state.options[ind];
    var newBudget = this.state.budget - choice.price;
    var options = await getFlights(this.state.day, choice.code, newBudget)

    this.setState({
      budget: newBudget,
      location: choice,
      day: this.state.day + 1,
      options: options,
      toggleMenu: false,
      gameover: newBudget <= 0
    })
  }

  reset = () => {
    this.setState({
      budget: 200,
      day: 1,
      location: {},
      options: [],
      gameover: false,
      toggleMenu: false
    })

    this.init();
  }

  handleKeyPress = (ev) => {
    var options = ['1', '2', '3', '4', '5'];

    if (!this.state.gameover) {
      if (!this.state.toggleMenu) {
        if (ev.key === 's') {
          this.stay();
        } else if (ev.key === 'l' && this.state.options.length) {
          this.toggleMenu();
        } else if (ev.key === 'q') {
          this.quit();
        }
      } else {
        if (options.includes(ev.key)) {
          if (this.state.options.length >= ev.key) {
            this.chooseFlight(ev.key-1);
            this.toggleMenu();
          }
        } else if (ev.key === 'b') {
          this.toggleMenu();
        }
      }
    }
  }

  quit = () => {
    this.props.history.push('/');
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress, false);
  }

  render() {
    if (this.state.gameover) {
      return <Gameover state={this.state} resetFunction={this.reset} history={this.props.history}/>
    } else {
      return (<div className="main">
        <h4 id="budget">Budget: ${this.state.budget}</h4>
        <h4 id="currentDay">Current Day: {this.state.day}</h4>

        <div className="location">
          <p id="preCity">You are in:</p>
          <h3 id="city">{this.state.location.name}</h3>
        </div>

        <div className="runners">
          <img src={Mafia} alt="mafia" width="160" height="160"/>
          <div className="risk">
            <p>Risk of Capture:</p>
            <h3>{this.state.location.risk}%</h3>
          </div>
          <img src={Runner} alt="runner" width="160" height="160"/>
        </div>

        <h4 id="nextMove">Choose your move:</h4>
        <div className="moves">
          <div className="buttons">
            <p>Earn ${this.state.location.return}</p>
            <button onClick={this.stay}>(S)tay</button>
          </div>
          <div className="buttons">
            <p>{this.state.options.length} flights avail.</p>
            <button onClick={this.toggleMenu} disabled={!this.state.options.length}>(L)eave</button>
          </div>
        </div>
        { this.state.toggleMenu ?
          (<div className="options">
            {this.state.options.map((option, i) => {
              return (<button key={i} onClick={() => this.chooseFlight(i)}>
                {option.name} ({i+1})
                <p>Risk: {option.risk}% &nbsp; Price: ${option.price}</p>
                </button>)
            })}
            <button onClick={this.toggleMenu} className="backButton">Back (B)</button>
          </div>) : ''
        }

        <Link to="/"><p>(Q)uit Game</p></Link>
      </div>);
    }
  }
}

export default Game;
