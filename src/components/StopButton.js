import React from 'react'
import { ReactComponent as Stop } from '../assets/svg/stop.svg'

const StopButton = () => {
   return (
      <button id='stop' className='sidebar__button'>
         <Stop />
      </button>
   )
}
export default StopButton