import styled from 'styled-components'
import { breakpoints, colors, fonts } from '../../styles'

export const Container = styled.div`
  background-color: ${colors.primaryDark};
  bottom: 0;
  display: flex;
  height: 3rem;
  justify-content: space-between;
  left: 0;
  position: fixed;
  top: initial;
  width: 100%;
  z-index: 10;
  @media (min-width: ${breakpoints.medium}) {
    top: 0;
  }
`

export const BrandLogo = styled.div`
  align-items: center;
  color: #fff;
  display: flex;
  flex-basis: 33%;
  justify-content: center;
  a {
    color: #fff;
    font-family: ${fonts.fira};
    text-decoration: none;
  }
`

export const NavLinks = styled.div`
  align-items: center;
  display: flex;
  flex-basis: 66%;
  font-family: ${fonts.fira};
  justify-content: space-around;
    a {
    color: #fff;
    font-family: ${fonts.fira};
    text-decoration: none;
  }
`