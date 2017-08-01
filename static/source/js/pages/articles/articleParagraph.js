import React, { Component } from 'react'
import styled from 'styled-components'
import { breakpoints, colors, fonts } from '../../styles'

const Wrapper = styled.div`
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
`

const ArticleParagraph = (props) => (
  <Wrapper>
    {props.body}
  </Wrapper>
)

export default ArticleParagraph