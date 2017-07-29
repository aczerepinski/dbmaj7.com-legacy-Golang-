import React, {Component} from 'react'

import { Link } from 'react-router-dom'
import { BrandLogo, Container, NavLinks } from './styles'


const Navbar = () => (
  <Container>
    <BrandLogo><Link to="/">DbMaj7.com</Link></BrandLogo>
    <NavLinks>
      <Link to="/articles">Articles</Link>
      <Link to="/resources">Resources</Link>
    </NavLinks>
  </Container>
)

export default Navbar