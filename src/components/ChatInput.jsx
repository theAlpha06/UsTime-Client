import React, { useState } from 'react';
import './ChatInput.css';

function ChatInput({handleSendMessage}) {
  const [msg, setMsg] = useState("");

  const sendChat = (event) => {
    event.preventDefault();
    if(msg.length > 0) {
      handleSendMessage(msg);
      setMsg("");
      event.target.reset();
    }
  }

  return (
    <div className='input_container'>
      <form onSubmit={(e) => sendChat(e)} className='input_form'>
        <input 
          type='text' 
          placeholder='Message' 
          onChange={(e => setMsg(e.target.value))}
          className='msg_input'
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