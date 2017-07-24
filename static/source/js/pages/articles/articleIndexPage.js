import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import API from '../../lib/api'

class ArticleIndexPage extends Component {
    constructor(props) {
      super(props)
      this.state = {
        articles: [],
        isFetching: false,
    }
  }

  componentWillMount() {
    if (!this.state.isFetching && this.state.articles.length === 0) {
      this.fetchArticles()
    }
  }

  fetchArticles() {
    this.setState({isFetching: true})
    API.fetchArticleSummaries()
      .then(
        (articles) => {
          this.setState({
            articles: articles,
            isFetching: false
          })
        }
      )
      .catch((e) => console.log(e))
  }

  renderArticleSummary(article) {
    return (
      <li key={article.slug}>
        <div>
          {article.publicationDate}
        </div>
        <div>
          <Link to={article.slug}>{article.title}</Link>
        </div>
        <div>
          {article.summary}
        </div>
      </li>
    )
  }
  
  render() {
    return (
      <div>
        { this.state.articles.map((article) => this.renderArticleSummary(article))}
      </div>
    )
  }
}

export default ArticleIndexPage