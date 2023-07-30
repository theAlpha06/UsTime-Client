import React from 'react'
import './Welcome.css';
import Cube from './Cube/Cube';

function Welcome({ currentUser }) {

  function detectWebGL() {

    let testCanvas = document.createElement("canvas");
    let gl = null;

    try {
      gl = testCanvas.getContext("webgl");
    } catch (x) {
      gl = null;
    }

    if (gl == null) {
      try {
        gl = testCanvas.getContext("experimental-webgl");
      } catch (x) {
        gl = null;
      }

    }
    if (gl) {
      return true;
    } else {
      return false;
    }
  }


  return (
    <div className='welcome_container'>
      
        {
          detectWebGL() ?
          <div className='cube_container'>
            <Cube />
          </div>
            :
            <h1 className='welcome_text'>Welcome, {currentUser?.name} !</h1>
        }
    </div>
  )
}

export default Welcome