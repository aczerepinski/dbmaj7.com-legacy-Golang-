import React, { Component } from 'react'
import styled from 'styled-components'
import { breakpoints, colors, fonts } from '../../styles'
import markdown from '../../lib/markdown'

const Wrapper = styled.div`
  p {
    color: ${colors.paragraph};
    font-family: ${fonts.fira};
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.4;
    margin-bottom: 1rem;
    @media (min-width: ${breakpoints.medium}) {
      font-size: 1.2rem;
      margin-bottom: 1.2rem;
    }
  }
  a {
    color: ${colors.primaryDark};
    border-bottom: 1px solid ${colors.complementaryDark};
    text-decoration: none;
    transition: .1s all ease-in-out;
    &:hover {
      color: ${colors.complementaryDark};
    }
  }
`

class ArticleMarkdown extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const innerHTML = this.props.body ? markdown.toHTML(this.props.body) : ''
    return (
      <Wrapper dangerouslySetInnerHTML={{__html: markdown.toHTML(this.props.body)}}/>
    )
  }
}
export default ArticleMarkdown