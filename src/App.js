import React, { Component } from 'react'
import { db } from './firebase/firebase.utils'
import Speech from 'speak-tts'

// Components
import Main from './Main'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'
import Sidebar from './components/Sidebar'
import RightSidebar from './components/RightSidebar'
import Article from './components/Article'
import SpeakButton from './components/SpeakButton'
import PauseButton from './components/PauseButton'
import ResumeButton from './components/ResumeButton'
import StopButton from './components/StopButton'
import Stopwatch from './components/Stopwatch'

// Stylesheet
import './assets/sass/main.scss'

class App extends Component {
  state = {
    theme: 'light',
    currentArticle: {},
    articleNum: 0,
    scores: [],
    selectedText: '',
  }

  _setState = (payload) => {
    this.setState((state) => ({
      ...state,
      ...payload,
    }))
  }

  onSelectedText = () => {
    const selectedText = window.getSelection().toString()
      ? window.getSelection().toString()
      : ''
    this._setState({ selectedText })
  }

  onThemeChange = () => {
    let theme = this.state.theme === 'light' ? 'dark' : 'light'

    // Updating theme state
    this._setState({ theme })
    localStorage.setItem('theme', theme)

    if (theme === 'dark') {
      document.body.classList.add('dark-theme')
    } else {
      document.body.classList.remove('dark-theme')
    }
  }

  readFullArticle() {
    let speech = new Speech()

    if (speech.speaking()) {
      speech.cancel()
    }

    if (speech.hasBrowserSupport()) console.log('speech synthesis supported')
    else console.log('Not Supported')

    speech.init({
      volume: 1,
      lang: 'en-GB',
      rate: 1,
      pitch: 1,
      voice: 'Google UK English Female',
      splitSentences: true,
      listeners: {
        onvoiceschanged: (voices) => {
          console.log('Event voiceschanged')
        },
      },
    })

    let article = this.state.selectedText
      ? this.state.selectedText
      : document.querySelector('article').innerText
    speech
      .speak({
        text: article,
        queue: false,
        listeners: {
          onend: () => {
            this._setState({ selectedText: '' })
          },
        },
      })
      .then(() => {
        console.log('Success !')
      })
      .catch((e) => {
        console.error('An error occurred :', e)
      })

    const pauseButton = document.getElementById('pause')
    const resumeButton = document.getElementById('resume')
    const stopButton = document.getElementById('stop')

    pauseButton.addEventListener('click', () => {
      speech.pause()
    })
    resumeButton.addEventListener('click', () => {
      speech.resume()
    })
    stopButton.addEventListener('click', () => {
      speech.cancel()
    })
  }

  setNewArticle = () => {
    let articleNum = parseInt(localStorage.getItem('article'), 10) + 1
    localStorage.setItem('article', articleNum)
    this.getArticle(localStorage.getItem('article'))
    localStorage.removeItem('scores')
    this._setState({ scores: [] })
  }

  async getArticle(articleNum = 0) {
    document.querySelector('.header__button svg').classList.add('animated')
    try {
      const data = await db
        .collection('articles')
        .where('number', '==', `${articleNum}`)
        .limit(1)
        .get()
      const article = data.docs[0].data()
      this._setState({
        currentArticle: article,
      })
    } catch {
      localStorage.setItem('article', '0')
      this.getArticle()
    }
    document.querySelector('.header__button svg').classList.remove('animated')
  }

  themeController = () => {
    // DARK / LIGHT Theme from Local storage
    let theme = localStorage.getItem('theme')
    if (theme && theme === 'dark') {
      document.body.classList.add('dark-theme')
      this._setState({ theme })
    } else {
      document.body.classList.remove('dark-theme')
    }
  }

  articleController = () => {
    // Get Data from Local Storage
    let articleNum = localStorage.getItem('article')
    let scores = JSON.parse(localStorage.getItem('scores'))
    let lastDate = localStorage.getItem('date')

    if (lastDate) {
      const newDate = new Date()
      // Compare between today date to the one in the local storage.
      const oneDay = 24 * 60 * 60 * 1000
      const diffDays = Math.round(Math.abs((lastDate - newDate) / oneDay))

      // Render new article if day changed 
      if (diffDays >= 1) {
        this.setNewArticle()
        localStorage.setItem('date', newDate)
      } else {
        if (scores) this._setState({ scores })
        this.getArticle(articleNum)
      }
    } else {
      if (scores) this._setState({ scores })
      this.getArticle(articleNum)
    }
  }

  componentDidMount() {
    this.themeController()
    this.articleController()
  }

  render() {
    return (
      <div className='container'>
        <Header
          getNewArticle={this.setNewArticle}
          onThemeChange={() => this.onThemeChange()}
        >
          <Stopwatch scores={this.state.scores} setScores={this._setState} />
        </Header>
        <Sidebar>
          <SpeakButton onClick={() => this.readFullArticle()} />
          <PauseButton />
          <ResumeButton />
          <StopButton />
        </Sidebar>
        <Main>
          <Article
            onMouseUpCapture={() => this.onSelectedText()}
            data={this.state.currentArticle}
          />
        </Main>
        <RightSidebar scores={this.state.scores} />
        <Footer />
      </div>
    )
  }
}

export default App
