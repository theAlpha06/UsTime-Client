import React, { useState } from 'react';
import './ChatInput.css';

function ChatInput({handleSendMessage, socket, currentChat}) {
  const [msg, setMsg] = useState("");

  const sendChat = (event) => {
    event.preventDefault();
    if(msg.length > 0) {
      handleSendMessage(msg);
      setMsg("");
      event.target.reset();
    }
  }

  const handleTyping = () => {
    window.addEventListener('keydown', () => {
      socket.current.emit('typing', {
          to: currentChat._id,
          typing: true,
        });
      })
  }
  return (
    <div className='input_container'>
      <form onSubmit={(e) => sendChat(e)} className='input_form'>
        <input 
          type='text' 
          placeholder='Message' 
          onChange={(e => setMsg(e.target.value))}
          className='msg_input'
          onFocus={handleTyping()}
        />
        <button 
          type='submit' 
          className='sendmsg_button'
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default ChatInput