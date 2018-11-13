import React from 'react';

class Howtoplay extends React.Component {
  constructor(props) {
    super(props);

    document.addEventListener('keydown', this.handleKeyPress, false)
  }

  handleKeyPress = (ev) => {
    if (ev.key === 'b') {
      this.backButton();
    }
  }

  backButton = (event) => {
    this.props.history.push('/');
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress, false);
  }

  render() {
    return (<div className="main help">
      <h4>Some bad people are after you, and you need to keep moving around the globe with limited $ to escape being caught!</h4>

      <ol>
        <li>Each city has a daily monetary incentive to staying there, but also has a percentage risk of you getting caught.</li>
        <li>You can choose to <span className="stay">Stay</span> or <span className="leave">Leave</span>, both will take 1 day.</li>
        <li>Choosing to <span className="stay">Stay</span> will earn you money, but will also expose you to the risk and increase the risk for the next day.</li>
        <li>Choosing to <span className="leave">Leave</span> will cost you money, but will not expose you to the risk.</li>
        <li>The <span className="leave">Leave</span> option provides you with some flights options to varying cities and of varying prices, powered by <span className="sky">Skyscanner</span>.</li>
        <li>The lower the flight price, the more dangerous the city, but you are only exposed to the risk if you <span className="stay">Stay</span>.</li>
        <li>Flights are not always available from a city. In such cases, you will be forced to <span className="stay">Stay</span> to wait for tomorrow's flights.</li>
      </ol>

      <h4>Your objective is to last as long as possible, with as much money as possible.</h4>
      <p>Score = Days Survived x Money Left</p>

      <button className="backButton" onClick={this.backButton}>(B)ack</button>
      <span className="credits">Built with React. Git repo <a href="https://github.com/penguimelia/on-the-run">here.</a></span><br/>
      <span className="credits">Credits to <a href="https://www.deviantart.com/sssashimi">sssashimi</a> for the runner gif.</span>
    </div>);
  }
}

export default Howtoplay;
