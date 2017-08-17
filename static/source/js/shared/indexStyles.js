import React, { Component } from 'react'
import styled from 'styled-components'
import { breakpoints, colors, fonts } from '../styles'

export const LinkWrapper = styled.div`
  a {
    color: ${colors.primaryDark};
    font-size: 1.2rem;
    text-decoration: none;
    transition: .1s all ease-in-out;
    &:hover {
      color: ${colors.complementaryDark};
    }
  }
`

export const SummaryWrapper = styled.div`
  font-family: ${fonts.fira};
  margin: 0 auto 1rem;
  max-width: 40rem;
`
export const Summary = styled.div`
  color: ${colors.paragraphLight};
  font-weight: 300;
`