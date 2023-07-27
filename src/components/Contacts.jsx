import React, { useState, useEffect } from 'react'
import './Contacts.css';
import Logout from './Logout';

function Contacts({ contacts, currentUser, changeChat, handleResponsive }) {
  const [curentUserName, setCurentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurentUserName(currentUser.name);
    }
    if (contacts) {
      setUsers(contacts)
    }
  }, [currentUser, contacts]);

  const currentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
    handleResponsive('contacts')
  }

  return (
    <div className='contacts_container'>
      <div className='contacts_currentuser'>
        <div className='currentuser_avatar'>
          <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt='' title={`${curentUserName}`} />
        </div>
        <div className='logout'>
          <Logout />
        </div>

      </div>
      <div className='contacts_contacts'>
        {
          users.map((user, index) => {
            return (
              user.avatarImage && (
                <div className={`contacts_list ${index === currentSelected ? "selectedChat" : ""}`}
                  key={index}
                  onClick={() => {
                    handleResponsive();
                    currentChat(index, user);
                  }}
                >
                  <div className='contacts_avatar'>
                    <img src={`data:image/svg+xml;base64,${user.avatarImage}`} alt=''
                      width={50}
                    />
                  </div>
                  <div className='contacts_name'>
                    {user.name}
                  </div>
                </div>
              )
            )

          })
        }
      </div>
    </div>
  )
}

export default Contacts