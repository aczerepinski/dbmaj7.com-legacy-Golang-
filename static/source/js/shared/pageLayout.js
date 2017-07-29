import styled from 'styled-components'
import { breakpoints, colors, fonts } from './../styles'

export const PageLayout = styled.section`
  margin: auto;
  max-width: 50rem;
  padding: 0 1rem;
    @media (min-width: ${breakpoints.medium}) {
    padding: 4rem 2rem;
  }
`

export const PageTitle = styled.h1`
  color: ${colors.primaryDark};
  font-family: ${fonts.fira};
  font-size: 1.5rem;
  margin: 1rem;
  text-align: center;
  @media (min-width: ${breakpoints.medium}) {
    font-size: 2rem;
  }
`