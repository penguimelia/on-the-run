import React from 'react';
import { Link } from 'react-router-dom';

class Gameover extends React.Component {
  constructor(props) {
    super(props)

    document.addEventListener('keydown', this.handleKeyPress, false);
  }

  calculateScore() {
    return this.props.state.day * this.props.state.budget;
  }

  handleKeyPress = (ev) => {
    if (ev.key === 'y') {
      this.props.resetFunction();
    } else if (ev.key === 'n') {
      this.props.history.push('/');
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress, false);
  }

  render() {
    return (<div className="main gameover">
      <h2> You got captured! </h2>

      <div className="stats">
        <h4> You survived <span>{this.props.state.day}</span> days,
        with $<span>{this.props.state.budget}</span> left.</h4>
        <h4> You were last seen in <span>{this.props.state.location.name}.</span></h4>
      </div>

      <h4> Score: {this.calculateScore()} </h4>

      <h4> Play again? </h4>
      <button onClick={this.props.resetFunction}>Yes (Y)</button>
      <Link to="/"><button>No (N) </button></Link>
    </div>);
  }
}

export default Gameover;
