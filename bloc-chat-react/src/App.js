import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

// Initialize Firebase
 var config = {
   apiKey: "AIzaSyATlp03dhSYz6qJvfkn_QI-1n_x8bck3MM",
   authDomain: "bloc-chat-react-b328a.firebaseapp.com",
   databaseURL: "https://bloc-chat-react-b328a.firebaseio.com",
   projectId: "bloc-chat-react-b328a",
   storageBucket: "bloc-chat-react-b328a.appspot.com",
   messagingSenderId: "211533339840"
 };

 firebase.initializeApp(config);

 class App extends Component {
   constructor (props) {
     super(props);
     this.state = {
       activeRoom: '',
       activeMessage: '',
       activeUser: '',
     };


    this.setRoom = this.setRoom.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.setUser = this.setUser.bind(this);
  };

  setRoom(room) {
    this.setState({ activeRoom: room })
//    console.log(this.state.activeRoom);
  }

  setMessage(message) {
    this.setState({ activeMessage: message })
  }

  setUser(user) {
    this.setState({ activeUser: user })
  }

  render() {
    return (
      <div>
        <nav>
          <h2>Bloc Chat</h2>
        <User firebase={ firebase } setUser={this.setUser} />
        </nav>
        { this.state.activeUser ?
          <div className="container">
              <RoomList firebase={ firebase } activeRoom={ this.state.activeRoom } setRoom={this.setRoom} />
              <MessageList firebase={ firebase } activeRoom={ this.state.activeRoom } setMessage={this.setMessage} />
          </div>
        : null }
       </div>
    );
  }
}
 export default App;
