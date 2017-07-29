import React, { Component } from 'react'
import styled from 'styled-components'
import { breakpoints, colors, fonts } from '../../styles'
import { dateFormatter } from '../../lib/utils'

const Wrapper = styled.div`
  border-bottom: 1px solid ${colors.hr};
  border-top: 1px solid ${colors.hr};
  display: flex;
  margin-bottom: 1rem;
  padding: .2rem;
`

const AuthorWrapper = styled.div`
  display: flex;
`

const Avatar = styled.div`
  height: 2.25rem;
  width: 2.25rem;
    img {
      height: auto;
      width: 100%;
    }
`

const AuthorMeta = styled.div`
  color: ${colors.paragraphLight};
  display: flex;
  flex-direction: column;
  font-family: ${fonts.fira};
  font-weight: 300;
  margin-left: .5rem;
  a {
    color: ${colors.primaryDark};
    font-weight: 400;
    text-decoration: none;
  }
`

const SocialShare = styled.div`
`

const ArticleMeta = (props) => (
  <Wrapper>
    <AuthorWrapper>
      <Avatar>
        <img src={props.author.photoURL} alt="author photo"/>
      </Avatar>
      <AuthorMeta>
        <span><a href={props.author.website}>{props.author.firstName} {props.author.lastName}</a></span>
        <span>{dateFormatter(props.publicationDate)}</span>
      </AuthorMeta>
    </AuthorWrapper>
    <SocialShare>
    </SocialShare>
  </Wrapper>
)

export default ArticleMeta