import React from 'react'
import './Welcome.css'

function Welcome({ currentUser }) {
  return (
    <div className='welcome_container'>
      <h1>Welcome, {currentUser?.name} !</h1>
    </div>
  )
}

export default Welcome