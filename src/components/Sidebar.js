import React from 'react'
//import { ReactComponent as Sound } from '../assets/svg/volume.svg'
import { ReactComponent as Translate } from '../assets/svg/search.svg'
import { ReactComponent as Donate } from '../assets/svg/wallet.svg'


const Sidebar = ({ children }) => {
   return (
      <div className='sidebar'>
         <button className='sidebar__button'>
            <Translate />
         </button>
         {/* <button className='sidebar__button'>
            <Sound />
         </button> */}
         {children}
         <button className='sidebar__button'>
            <Donate />
         </button>
      </div>
   )
}

export default Sidebar
