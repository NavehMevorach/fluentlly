import React from 'react'
import './sass/main.scss'
import Header from './Header'
import Sidebar from './Sidebar'
import RightSidebar from './RightSidebar'
import Main from './Main'
import Footer from './Footer'

const App = () => {
  return (
      <div className='container'>
        <Header />
        <Sidebar />
        <Main />
        <RightSidebar/>
        <Footer />
      </div>
  )
}

export default App
