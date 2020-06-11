import React from 'react'
import { ReactComponent as Resume } from '../assets/svg/resume.svg'

const ResumeButton = () => {
   return (
      <button id='resume' className='sidebar__button'>
         <Resume />
      </button>
   )
}
export default ResumeButton