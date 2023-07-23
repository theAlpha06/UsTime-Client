import React from 'react';
import './Loader.css';

function Loader() {
  return (
    <div className='center'>
      <div className="loader">
        <img src="/loader.gif" alt="loader" />
      </div>
    </div>
  )
}

export default Loader