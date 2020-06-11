import React from 'react'
import { ReactComponent as Sound } from '../assets/svg/volume.svg'

const SpeakButton = ({ onClick }) => {
   return (
      <button onClick={onClick} className='sidebar__button'>
         <Sound />
      </button>
   )
}
export default SpeakButton