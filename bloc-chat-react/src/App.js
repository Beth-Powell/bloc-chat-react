import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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

     };
   }
 }

 render(){
   return = null;
 }

 export default App;
