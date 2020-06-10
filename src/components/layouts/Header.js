import React from 'react'
import { ReactComponent as Random } from '../../assets/svg/random.svg'

const Header = ({ onThemeChange, children }) => {
   return (
      <header className='header'>
         <div className='header__row'>
            {children}
            <a href='mailto:navehmevorach@gmail.com' className='header__button'>🙏 Feature request</a>
            <button className='header__new-article header__button'>
               <Random />
               New article
            </button>
            <div id="sun-moon" onClick={onThemeChange}></div>
         </div>
      </header>
   )
}

export default Header
