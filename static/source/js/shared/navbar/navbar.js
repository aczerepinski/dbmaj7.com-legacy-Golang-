import React, {Component} from 'react'

import { Link } from 'react-router-dom'
import { Container, BrandLogo } from './styles'


const Navbar = () => (
  <Container>
    <BrandLogo><Link to="/">DbMaj7</Link></BrandLogo>
  </Container>
)

export default Navbar