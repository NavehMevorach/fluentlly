import React from 'react'
import { ReactComponent as Pause } from '../assets/svg/pause.svg'

const PauseButton = () => {
   return (
      <button id='pause' className='sidebar__button'>
         <Pause />
      </button>
   )
}
export default PauseButton