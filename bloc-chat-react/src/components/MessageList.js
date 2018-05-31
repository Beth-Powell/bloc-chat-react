import React, { Component } from 'react';


class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newmessage: '',
      allmessages: [],
//      activeRoom: null,
    };
    this.createMessage = this.createMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  createMessage(){
    this.messagesRef.push({
      content: this.state.value,
      roomId: this.props.activeRoom.key,
      username: this.props.user.email
    });
  }

  handleChange(event) {
    this.setState({newmessage: event.target.value});
  }

  handleSubmit(event) {
    this.createMessage();
    event.preventDefault();
    this.setState({newmessage: ''});
  }

  componentDidMount() {
     this.messagesRef.on('child_added', snapshot => {
       const message = snapshot.val();
       message.key = snapshot.key;
       this.setState({ message: this.state.messages.concat( message ) })
     });
   }

render() {
console.log(this.props.activeRoom);


  return (
    <div className='message-list'>
      <h2 className='room-name'>{ this.props.activeRoom ? this.props.activeRoom.name : 'Please select a room' }</h2>
      <ul>
        { this.state.messages.map((message, index) => (<li key={index}> <b>{message.username}</b> <br /> {message.content} </li>)
      )}
      </ul>

        <form onSubmit={this.handleSubmit}>
            <input type="text" newmessage={this.state.newmessage} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
    </div>
  )
 }
}

export default MessageList;
