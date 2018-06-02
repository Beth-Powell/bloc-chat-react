import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

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
       activeRoom: null,
       activeMessage: null
     };


    this.setRoom = this.setRoom.bind(this);
    this.setMessage = this.setMessage.bind(this);
  };

  setRoom(room) {
    this.setState({ activeRoom: room.name })
//    console.log(this.state.activeRoom);
  }

  setMessage(message) {
    this.setState({ activeMessage: message })
  }

  render() {
    return (
      <div>
        <nav>
          <h2>Bloc Chat</h2>
        </nav>

          <div className="container">
            <ul>
              <RoomList firebase={ firebase } activeRoom={ this.state.activeRoom } setRoom={this.setRoom} />
              <MessageList firebase={ firebase } activeRoom={ this.state.activeRoom } setMessage={this.setMessage} />
            </ul>
          </div>
       </div>
    );
  }
}
 export default App;
