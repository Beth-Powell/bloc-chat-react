import React, { Component } from 'react';


class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      activeRoom: null,
    };
    this.createMessage = this.createMessage.bind(this);
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  createMessage(){
    this.messagesRef.push({
      name: this.state.value
    });
    this.setState({
      newMessage: ''
    });
  }



  componentDidMount() {
     this.messagesRef.on('child_added', snapshot => {
       const message = snapshot.val();
       message.key = snapshot.key;
       this.setState({ message: this.state.rooms.concat( message ) })
     });
   }


render() {
  return (
    <div>
      {
        this.state.rooms.map( (room, index) => (<li className='listOfRooms' onClick={() => this.props.setRoom(room)} key={index}> {room.name} </li>)
        )
      }
        <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
    </div>
  )
 }
}

export default MessageList;
