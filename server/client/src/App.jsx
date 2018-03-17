import React, { Component } from 'react';
import Vote from './components/vote.js';
import VoteCount from './components/voteCount.js';

import './style/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      showVotes : false
    }
    this.showVotes = this.showVotes.bind(this);
  };

  showVotes(e) {
    // e.preventDefault();
    this.setState({
      showVotes : <tr></tr>
    });
  }


  render() {
    return (
      <div className="App">
      <div className = "header">
        <div><img src={require('./logo.png')} alt="Jitsi logo" /></div>
        <h1>Voting feature glimpse</h1>
      </div>
      { (!this.state.showVotes) ?
        <Vote showVotes={this.showVotes}/> : <VoteCount/>
      }
        
      </div>
    );
  }
}

export default App;
