import React, { Component } from 'react';


class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage: '',
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
    this.setState({newMessage: event.target.value});
  }

  handleSubmit(event) {
    this.createMessage();
    event.preventDefault();
    this.setState({newMessage: ''});
  }

  componentDidMount() {
     this.messagesRef.on('child_added', snapshot => {
       const message = snapshot.val();
       message.key = snapshot.key;
       this.setState({ message: this.state.message.concat( message ) })
     });
   }

render() {
  return (
    <div className='message-list'>
      <h2 className='room-name'>{ this.props.activeRoom ? this.props.activeRoom.name : 'Please select a room' }</h2>
      <ul>
        { this.state.messages.map((message, index) => (<li key={index}> <b>{message.username}</b> <br /> {messsage.content} </li>)
      )}
      </ul>

        <form onSubmit={this.handleSubmit}>
            <input type="text" newMessage={this.state.newMessage} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
    </div>
  )
 }
}

export default MessageList;
