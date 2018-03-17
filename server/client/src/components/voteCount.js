import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import {Label, FormGroup, Radio, Button} from 'react-bootstrap';



class VoteCount extends Component {
  constructor() {
    super();
    this.state = {
      voteCount: { }, 
      endpoint: "http://127.0.0.1:4002",
    };
    this.socket = socketIOClient();        //setting up the socket for client on root "./"
  };

  

  componentWillMount() {

      // this.socket.on('votes', function(data) {
      //   this.setState({voteCount: data})
      // }.bind(this));

    // console.log(this.state.voteCount);
    
  }


  componentDidMount() {
    this.socket.on('votes', function(data) {
      this.setState({voteCount: data})
      // console.log(this.state.voteCount);
    }.bind(this));

    // socket.on('polls', function(data) {
    //   this.setState({poll: data})
    // }.bind(this));


    // socket.on('votes', function(data) {
    //   this.setState({voteCount: data})
    // }.bind(this));

    
  }


  // // extra method
  // incCount() {
  //   const endpoint  = this.state.endpoint;
  //   const socket = socketIOClient(endpoint);
  //   socket.emit('votes', 1);
  // }

  // //extra 
  // decCount() {
  //   const endpoint  = this.state.endpoint;
  //   const socket = socketIOClient(endpoint);
  //   socket.emit('votes', -1);
  // }



  render() {

    return (
      <div>
        
          <h2>Voting stats as per members vote</h2>
          <hr/>
          <h2>
            <Label bsStyle="primary">{this.state.voteCount.title}</Label>
          </h2> 
          {
            this.state.voteCount.responses ?
              Object.keys(this.state.voteCount.responses).map((item,index)=>{
                return <h3>{item} : {this.state.voteCount.responses[item]}</h3>
              })
            : <div>Loading .....</div>
          }
      </div>
    );
  }
}

export default VoteCount;
