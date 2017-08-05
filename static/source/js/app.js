import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import Navbar from './shared/navbar/navbar'

import ArticleIndexPage from './pages/articles/articleIndexPage'
import ArticleShowPage from './pages/articles/articleShowPage'
import AudioContext from './shared/audioContext'

const AppLayout = (appProps) => (
  <div>
    <Navbar/>
    <Route exact path="/articles" component={ArticleIndexPage}/>
    <Route path="/articles/:slug" render={(routerProps) => (
      <ArticleShowPage
        playChord={appProps.playChord}
        stopChord={appProps.stopChord}
        playFrequency={appProps.playFrequency}
        stopFrequency={appProps.stopFrequency}
        {...routerProps}
      />
    )}
    />
  </div>
)

/*
There can only be one instance of the AudioContext, so we instantiate
here and pass the API to pages that needs it.
*/
class App extends Component {
  constructor(props) {
    super(props)
    this.playChord = this.playChord.bind(this)
    this.stopChord = this.stopChord.bind(this)
    this.playFrequency = this.playFrequency.bind(this)
    this.stopFrequency = this.stopFrequency.bind(this)
  }

  playChord(chord) {
    this.audioCtx.playChord(chord)
  }

  stopChord(chord) {
    this.audioCtx.stopChord(chord)
  }

  playFrequency(frequency) {
    this.audioCtx.playFrequency(frequency)
  }

  stopFrequency(frequency) {
    this.audioCtx.stopFrequency(frequency)
  }

  render() {
    return (
      <section>
      <AudioContext ref={(ctx) => { this.audioCtx = ctx }}/>
      <AppLayout
        playChord={this.playChord}
        stopChord={this.stopChord}
        playFrequency={this.playFrequency}
        stopFrequency={this.stopFrequency}
      >
      </AppLayout>
      </section>
    )
  }
}

ReactDOM.render((
  <Router>
    <App/>
  </Router>
), document.querySelector('#dbmaj7'))