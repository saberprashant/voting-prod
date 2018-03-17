import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import {Label, FormGroup, Radio, Button} from 'react-bootstrap';
import VoteCount from './voteCount';

import '../style/vote.css';


class Vote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poll: { },                            //poll coming from socket server
      voteCount: { }, 
      endpoint: "http://127.0.0.1:4002",
      selectedOpt : '',

      test: {                               //same object as poll coming from server
        'title': "Which cuisine is best in the world?",
        'options': ['Chinese', 'Indian', 'American', 'Italian']
      },
      voteOptions: ''

    };
    this.socket = socketIOClient();       //setting up the socket for client on root "./"
  };

  

  componentWillMount() {

    // const socket = socketIOClient(this.state.endpoint);
    // this.socket.on('polls', function(data) {    
    //   this.setState({poll: data})
    // }.bind(this));

    // this.socket.on('votes', function(data) {
    //   this.setState({voteCount: data})
    // }.bind(this));

    

   }


  componentDidMount() {


    this.socket.on('polls', function(data) {   
      this.setState({poll: data})
    }.bind(this));

    this.socket.on('votes', function(data) {
      this.setState({voteCount: data})
    }.bind(this));



    // const incCount = () => {
    //   socket.emit('votes', 1);
    // }
    
    // const decCount = () => {
    //   socket.emit('votes', -1);
    // }
    
  }



  // incCount() {
  //   const endpoint  = this.state.endpoint;
  //   const socket = socketIOClient(endpoint);
  //   socket.emit('votes', 1);
  // }

  // decCount() {
  //   const endpoint  = this.state.endpoint;
  //   const socket = socketIOClient(endpoint);
  //   socket.emit('votes', -1);
  // }


  check() {
    this.socket.on('votes', function(data) {
      this.setState({voteCount: data})
    }.bind(this));
    // console.log('this.state.voteCount ->', this.state.voteCount );
  }

  selectOption(event) {
    // console.log('selected option called', event.target.value);
    this.setState({selectedOpt : event.target.value})
  }

  submitVote() {
    // console.log('submit vote called', this.state.selectedOpt);
    if(this.state.selectedOpt) {
      this.socket.emit('votes', this.state.selectedOpt)
      this.props.showVotes(true);
    } else {
      alert('Please select an option to vote');
    }
  }



  render() {

    // let voteOptions;            //here, I simply map over to each option to create a radio button dynamically
  
    // if (this.state.poll.options.length) {
    //   voteOptions = this.state.poll.options.map(
    //     (obj, index) => (<Radio key={index} name="radioGroup">{obj}</Radio>)
    //   );
    // } else {
    //   voteOptions = <h1>Working</h1>;
    // } 



    return (
      <div>
        
      <form >
        <FormGroup>
          <h2>
            <Label bsStyle="primary">{this.state.poll.title}</Label>
          </h2> 
          {/*<h1>
            <Label bsStyle="primary">{this.state.voteCount.title}</Label>
          </h1> */}
          <div className = "radios" onChange = {this.selectOption.bind(this)}>
          {
            (this.state.poll.options && this.state.poll.options.length > 0) ?
            this.state.poll.options.map((item, index) => {
              return <Radio className="container"  key={index} value={item} name="radioGroup" >
                      {item}
                    </Radio>
            }): <div style={{'text-align':'center'}}>Loading .....</div>
          }
          </div>

          {/* checking from test state object 
          <Radio name="radioGroup">
            {this.state.test.options[2]}  
          </Radio>
           */}
          <Button type="button"  onClick={this.submitVote.bind(this)} bsStyle="info">Vote Now</Button>
        </FormGroup>
      </form>


      {/*  to check for socket data from socket server
      <Button type="button"  onClick={this.check.bind(this)} bsStyle="danger">Check</Button>*/}

      </div>
    );
  }
}

export default Vote;
