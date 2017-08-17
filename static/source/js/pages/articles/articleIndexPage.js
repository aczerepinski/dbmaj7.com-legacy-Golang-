import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import API from '../../lib/api'
import { PageLayout, PageTitle } from '../../shared/pageLayout'
import { LinkWrapper, Summary, SummaryWrapper } from '../../shared/indexStyles'
import { breakpoints, colors, fonts } from '../../styles'
import { dateFormatter } from '../../lib/utils'

const PublicationDate = styled.div`
  color: ${colors.paragraphLight};
  font-size: .8rem;
  font-weight: 300;
`

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
      <SummaryWrapper key={article.slug}>
        <PublicationDate>
          {dateFormatter(article.publicationDate)}
        </PublicationDate>
        <LinkWrapper>
          <Link to={`/articles/${article.slug}`}>{article.title}</Link>
        </LinkWrapper>
        <Summary>
          {article.summary}
        </Summary>
      </SummaryWrapper>
    )
  }
  
  render() {
    return (
      <PageLayout>
        <PageTitle>Articles</PageTitle>
      <div>
        { this.state.articles.map((article) => this.renderArticleSummary(article))}
      </div>
      </PageLayout>
    )
  }
}

export default ArticleIndexPage