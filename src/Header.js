import React, { useState } from 'react'
import { ReactComponent as Random } from './svg/random.svg'
import Stopwatch from './Stopwatch'

const Header = () => {
  const [mode, setMode] = useState(false)
  const handleCheckbox = (el) => {
    if (!mode) document.querySelector('body').classList.add('dark-theme')
    else document.querySelector('body').classList.remove('dark-theme')
    setMode(!mode)
  }
  return (
    <header className='header'>
      <div className='header__row'>
        <Stopwatch />
        <a href='mailto:navehmevorach@gmail.com' className='header__button'>
          🙏 Feature request
        </a>
        <button className='header__new-article header__button'>
          <Random />
          New article
        </button>
        <div id="sun-moon" onClick={handleCheckbox}></div>

        {/* <label className='dayNight'>
          <input type='checkbox' onChange={handleCheckbox} />
          <div></div>
        </label> */}
      </div>
    </header>
  )
}

export default Header
