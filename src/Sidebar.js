import React from 'react'
import { ReactComponent as Sound } from './svg/volume.svg'
import { ReactComponent as Translate } from './svg/search.svg'
import { ReactComponent as Donate } from './svg/wallet.svg'
import axios from 'axios'

// const config = {
//   headers: { Authorization: `Bearer ${token}` }
// };

// const bodyParameters = {
//    "q": ["Hello world", "My name is Jeff"],
//    "target": "de"
// };

// axios.post(
// 'https://translation.googleapis.com/language/translate/v2',
// bodyParameters,
// config
// ).then(console.log).catch(console.log);

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <button className='sidebar__button'>
        <Translate />
      </button>
      <button className='sidebar__button'>
        <Sound />
      </button>
      <button className='sidebar__button'>
        <Donate />
      </button>
    </div>
  )
}

export default Sidebar
