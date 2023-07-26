import React from 'react'
import './Welcome.css';
import Cube from './Cube/Cube';

function Welcome({ currentUser }) {
  return (
    <div className='welcome_container'>
    {/* <div className='cube_container'> */}
      {/* <Cube /> */}
    {/* </div> */}
      <h1>Welcome, {currentUser?.name} !</h1>
    </div>
  )
}

export default Welcome