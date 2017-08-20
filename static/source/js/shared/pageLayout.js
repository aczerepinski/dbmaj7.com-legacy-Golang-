import styled from 'styled-components'
import { borderRadii, breakpoints, colors, fonts, shadows } from './../styles'

export const PageLayout = styled.section`
  margin: 1rem auto 4rem;
  max-width: 50rem;
  padding: 0 1rem;
    @media (min-width: ${breakpoints.medium}) {
    margin: auto;
    padding: 4rem 2rem;
  }
`

export const PageLayoutDark = PageLayout.extend`
  background-color: ${colors.backgroundLight};
  max-width: initial;
  margin: auto;
  min-height: 100%;
  padding: 0;
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

export const PageTitleLight = PageTitle.extend`
  background-color: ${colors.primaryDark};
  border-radius: ${borderRadii.round};
  color: #fff;
  box-shadow: ${shadows.medium};
  margin: 1rem auto 2rem;
  padding: .5rem;
  width: 30rem;
  @media (min-width: ${breakpoints.medium}) {
    font-size: 1.5rem;
  }
`