import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  createRoom(room){
    this.roomsRef.push({
      name: "Room" + room.key
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.createRoom;
  }

  componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       room.key = snapshot.key;
       this.setState({ rooms: this.state.rooms.concat( room ) })
     });
   }


render() {
  return (
    <div>
      {
        this.state.rooms.map( (room, index) => (<li onClick={() => this.props.setRoom(room)} key={index}> {room.name} </li>)
        )
      }
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name={this.createRoom} />
          </label>
          <input type="submit" value="Submit" />
        </form>
    </div>
  )
 }
}

export default RoomList;
