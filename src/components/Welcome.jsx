import React from 'react'
import './Welcome.css';
import Cube from './Cube/Cube';

function Welcome({ currentUser }) {
  return (
    <div className='welcome_container'>
    <div className='cube_container'>
    {
      !!window.WebGL2RenderingContext ? <Cube /> : <h1 className='welcome_text'>Welcome, {currentUser?.name} !</h1>
    }
      {/* <Cube /> */}
    </div>
    </div>
  )
}

export default Welcome