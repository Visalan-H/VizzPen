import React from 'react'
import './AbsButton.css'

const AbsButton = ({top,onClick,state,title,icons}) => {
  return (
      <button title={title} className='abs_button' style={{ top: top }} onClick={onClick}><i className={`fa fa-${state ? icons.true : icons.false}`}></i></button>
  )
}

export default AbsButton