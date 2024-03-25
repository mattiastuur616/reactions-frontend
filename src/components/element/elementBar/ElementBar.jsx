import React from 'react';
import './elementBar.css';

const ElementBar = ({ symbol, name }) => {
  return (
    <div className='reactions__elementBar'>
        <div className='reactions__elementBar-symbol'>
            <p>{symbol}</p>
        </div>

        <div className='reactions__elementBar-name'>
            <p>{name}</p>
        </div>
    </div>
  )
}

export default ElementBar
