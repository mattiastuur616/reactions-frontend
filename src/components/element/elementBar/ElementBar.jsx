import React from 'react';
import Draggable from 'react-draggable';
import './elementBar.css';

const ElementBar = ({ symbol, name }) => {
  const [dragPosition, setDragPosition] = React.useState(null);

  const stopDrag = () => {
    setDragPosition({x: 0, y: 0});
  }

  const saveElement = () => {
    localStorage.setItem("symbol", symbol);
  }

  return (
    <div className='reactions__elementBar'>
      <Draggable onMouseDown={saveElement} onStop={stopDrag} position={dragPosition}>
        <div className='reactions__elementBar-symbol'>
          <p>{symbol}</p>
        </div>
      </Draggable>

      <div className='reactions__elementBar-name'>
          <p>{name}</p>
      </div>
    </div>
  )
}

export default ElementBar
