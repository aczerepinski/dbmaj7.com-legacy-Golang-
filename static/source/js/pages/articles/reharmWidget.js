import React, { Component } from 'react'
import styled from 'styled-components'
import { breakpoints, colors, fonts } from '../../styles'

const Wrapper = styled.div`
  border: 1px solid ${colors.primaryDark};
  border-radius: .15rem;
  max-width: 40rem;
  margin: 0 auto;
   @media (min-width: ${breakpoints.medium}) {
    font-size: 1.2rem;
  }
`

const Menu = styled.div`
  display: flex;
  height: 1.5rem;
`

const MenuOption = styled.div`
  align-items: center;
  background-color: ${props => props.selected ? colors.primaryDark : '#fff'};
  color: ${props => props.selected ? '#fff' : colors.primaryDark};
  display: flex;
  flex-basis: 50%;
  font-family: ${fonts.fira};
  font-size: 1rem;
  font-weight: 400;
  justify-content: center;
  transition: .1s all ease-in-out;
  &:hover {
    color: ${props => props.selected ? '#fff' : colors.complementaryDark};
    cursor: pointer;
  }
`

MenuOption.defaultProps = {
  selected: false
}

const MusicalExample = styled.div`
  display: flex;
  height: 2.5rem;
  flex-direction: row;
`

const Measure = styled.div`
  border-right: 1px solid ${colors.borderLight};
  flex: 1;
  &:last-of-type {
    border-right: none;
  }
`

const MeasureNumber = styled.div`
  color: ${colors.borderLight};
  left: .5rem;
  font-family: ${fonts.fira};
  font-size: .5rem;
  font-weight: 300;
  position: relative;
  top: .5rem;
`

const MeasureChords = styled.div`
  color: ${colors.primaryDark};
  display: flex;
  font-family: ${fonts.fira};
  font-weight: 300;
  justify-content: space-around;
`

const Chord = styled.div`
`

class ReharmWidget extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedChords: 0,
      renderAnalysis: false,
    }
    this.setSelectedChords = this.setSelectedChords.bind(this)
    this.setRenderAnalysis = this.setRenderAnalysis.bind(this)
  }

  setSelectedChords(selection) {
    this.setState({selectedChords: selection})
  }

  setRenderAnalysis(selection) {
    this.setState({renderAnalysis: selection})
  }

  renderChords(chords) {
    return chords.map((chord, i) => {
      return (
        <Chord key={i}>{chord}</Chord>
      )
    })
  }

  renderExample() {
    const example = this.props.musicalExamples[this.state.selectedChords]
    const measures = example.chords
    return measures.map((measure, i) => {
      return (
        <Measure key={i}>
          <MeasureNumber>{i+example.measureNumber}</MeasureNumber>
          <MeasureChords>{this.renderChords(measure)}</MeasureChords>
        </Measure>
      )
    })
  }

  render() {
    if (this.props.musicalExamples.length < 2) {
      return null;
    }
    const a = this.props.musicalExamples[0]
    const b = this.props.musicalExamples[1]
    return (
      <Wrapper>
        <Menu>
          <MenuOption
            selected={this.state.selectedChords === 0}
            onClick={() => {this.setSelectedChords(0)}}
          >
            {a.title}
          </MenuOption>
          <MenuOption
            selected={this.state.selectedChords === 1}
            onClick={() => {this.setSelectedChords(1)}}
          >
            {b.title}
          </MenuOption>
        </Menu>
        <MusicalExample>
          {this.renderExample()}
        </MusicalExample>
        <Menu>
          <MenuOption
            selected={this.state.renderAnalysis}
            onClick={() => {this.setRenderAnalysis(true)}}
          >
            Analysis
          </MenuOption>
          <MenuOption
            selected={!this.state.renderAnalysis}
            onClick={() => {this.setRenderAnalysis(false)}}
          >
            Chords
          </MenuOption>
        </Menu>
      </Wrapper>
    )
  }
}

export default ReharmWidget