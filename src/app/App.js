import React, { Component } from 'react'
import { db } from "../firebase/firebase.utils"
import Speech from 'speak-tts'

// Components
import Main from '../Main'
import Header from '../components/layouts/Header'
import Footer from '../components/layouts/Footer'
import Sidebar from '../components/Sidebar'
import RightSidebar from '../components/RightSidebar'
import Article from "../components/Article"
import Instructions from "../components/Instructions"
import SpeakButton from "../components/SpeakButton"
import Stopwatch from '../components/Stopwatch'

// Stylesheet
import '../assets/sass/main.scss'

class App extends Component {

   state = {
      theme: 'light',
      articles: [],
      currentArticle: {},
      scores: []
   }

   _setState(payload) {
      this.setState(state => ({
         ...state, ...payload
      }))
   }

   onThemeChange() {
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

   readArticle() {
      let speech = new Speech()

      if (speech.speaking()) {
         speech.cancel()
      }

      if (speech.hasBrowserSupport()) { // returns a boolean
         console.log("speech synthesis supported")
      }
      speech.init({
         'volume': 1,
         'lang': 'en-GB',
         'rate': 1,
         'pitch': 1,
         'voice': 'Google UK English Female',
         'splitSentences': true,
         'listeners': {
            'onvoiceschanged': (voices) => {
               console.log("Event voiceschanged", voices)
            }
         }
      })



      let article = document.querySelector('article')
      console.log(article.innerText)

      speech.speak({
         text: article.innerText,
         queue: false,
         listeners: {
            onstart: () => {
               console.log("Start utterance")
            },
            onend: () => {
               console.log("End utterance")
            },
            onresume: () => {
               console.log("Resume utterance")
            },
            onboundary: (event) => {
               console.log(event)
               console.log(event.name + ' boundary reached after ' + event.elapsedTime + ' milliseconds.')
            }
         }
      }).then(() => {
         console.log("Success !")
      }).catch(e => {
         console.error("An error occurred :", e)
      })
   }

   async getArticles() {

      let articles = []
      let articlesSnapshot = await db.collection('articles').get()
      articlesSnapshot.forEach(article => {
         articles.push({ id: article.id, ...article.data() })
      })
      this._setState({ articles, currentArticle: articles[0] })

   }

   componentDidMount() {

      let theme = localStorage.getItem('theme')
      if (theme && theme === 'dark') {
         document.body.classList.add('dark-theme')
         this._setState({ theme })
      } else {
         document.body.classList.remove('dark-theme')
      }

      this.getArticles()
   }

   render() {
      return (
         <div className='container' >
            <Header onThemeChange={() => this.onThemeChange()}>
               <Stopwatch />
            </Header>
            <Sidebar>
               <SpeakButton onClick={() => this.readArticle()} />
            </Sidebar>
            <Main>
               <Article data={this.state.currentArticle} />
            </Main>
            <RightSidebar />
            <Footer />
         </div>
      )
   }
}

export default App
