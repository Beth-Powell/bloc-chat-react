import React, { Component } from 'react';


class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      value: '',
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
    this.setState({
      newMessage: ''
    });
  }

  handleChange(event) {
    this.setState({value: event.target.value});
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
        { this.state.messages.map( (message, index) => (<li this.props.setMessage(message)} key={index}> {messsage.content} </li>)
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
