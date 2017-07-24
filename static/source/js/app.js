import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import ArticleIndexPage from './pages/articles/articleIndexPage'
import ArticleShowPage from './pages/articles/articleShowPage'

const App = () => (
  <div>
    <Route exact path="/articles" component={ArticleIndexPage}/>
    <Route path="/articles/:slug" component={ArticleShowPage}/>
  </div>
)

ReactDOM.render((
  <Router>
    <App/>
  </Router>
), document.querySelector('#dbmaj7'))