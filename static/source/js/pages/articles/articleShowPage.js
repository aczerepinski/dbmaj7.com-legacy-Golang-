import React, { Component } from 'react'
import API from '../../lib/api'
import { PageLayout, PageTitle } from '../../shared/pageLayout'
import ArticleMeta from './articleMeta'
import ArticleParagraph from './articleParagraph'
import ReharmWidget from './reharmWidget'

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
      return <ArticleParagraph {...component} key={component.order}/>
    }
    if (component.templateName === 'reharmWidget') {
      return (
      <ReharmWidget
        {...component}
        playChord={this.props.playChord}
        stopChord={this.props.stopChord}
        key={component.order}
      />
      )
    }
  }

  renderArticle() {
    const a = this.state.article
    return (
      <PageLayout>
        <PageTitle>{a.title}</PageTitle>
        <ArticleMeta {...this.state.article}/>
        {a.body.map((component) => this.componentDispatcher(component))}
      </PageLayout>

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



export default ArticleShowPage