import React, { Component } from 'react'
import API from '../../lib/api'

class ArticleShowPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      article: null,
      isFetching: false,
    }
  }

  componentWillMount() {
    const pathComponents = this.props.location.pathname.split('/')
    if (pathComponents.indexOf('articles') >= 0 && pathComponents.length >= 2) {
      this.fetchArticle(pathComponents[pathComponents.indexOf('articles') + 1])
    }
  }

  fetchArticle(slug) {
    this.setState({isFetching: true})
    API.fetchArticleBySlug(slug)
      .then(
        (articleData) => {
          this.setState({
            article: articleData,
            isFetching: false
          })
        }
      )
      .catch((e) => console.log(e))
  }

  componentDispatcher(component) {
    if (component.templateName === 'articleParagraph') {
      return <ArticleParagraph {...component} />
    }
  }

  renderArticle() {
    const a = this.state.article
    return (
      <div>
        <h1>{a.title}</h1>
        {a.body.map((component) => this.componentDispatcher(component))}
      </div>

    )
  }


  
  render() {
    return (
      <div>
      { this.state.isFetching && !this.state.article ? 'loading...' : this.renderArticle() }
      </div>
    )
  }
}

const ArticleParagraph = (props) => (
  <div>
    {props.body}
  </div>
)

export default ArticleShowPage