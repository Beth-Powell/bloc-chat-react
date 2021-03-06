import React, { Component } from 'react';


class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newmessage: '',
    };
    this.createMessage = this.createMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.messagesRef = this.props.firebase.database().ref('messages');
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  createMessage(){
    this.messagesRef.push({
      content: this.state.newmessage,
      roomId: this.props.activeRoom.key,
      username: this.props.user.displayName,
    });
  }

  handleChange(event) {
    this.setState({newmessage: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.createMessage();
    this.setState({newmessage: ''});
  }

  componentDidMount() {
     this.messagesRef.on('child_added', snapshot => {
       const message = snapshot.val();
       message.key = snapshot.key;
       this.setState({ messages: this.state.messages.concat(message)});
     });
   }


render() {
  return (
    <div className='message-list'>
      <h2 className='room-name'>{ this.props.activeRoom ? this.props.activeRoom.name : 'Please select a room' }</h2>
      <ul>
        { this.state.messages.filter(message => message.roomId == this.props.activeRoom.key).map((message, index) => (<li key={index}> <b>{message.username}</b> <br /> {message.content} </li>),
      )}
      </ul>
        <form onSubmit={this.handleSubmit}>
            <input value={this.state.newmessage} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
    </div>
  )
 }
}

export default MessageList;
