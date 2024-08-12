import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './UserButton.css'

function UserButton({text}) {
  return (
    <button className="user-button">
      <FontAwesomeIcon icon="fa-solid fa-user" className="caret-icon"/>
      <span>{text}</span>
    </button>
  )
}

export default UserButton