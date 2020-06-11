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
         {children}
         <a href='https://www.paypal.me/cupofcoffe' target="_blank" rel="noopener noreferrer" className='sidebar__button cup-of-coffee'>
            <Donate />
         </a>
      </div>
   )
}

export default Sidebar
