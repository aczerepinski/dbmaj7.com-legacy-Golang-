import React, { Component } from 'react'
import styled from 'styled-components'
import { breakpoints, colors, fonts, shadows } from '../../styles'
import ChordUtils from '../../lib/chordUtils'

const Wrapper = styled.div`
  border-radius: 3px;
  box-shadow: ${shadows.medium};
  max-width: 40rem;
  margin: 0 auto 1.2rem;
  overflow: hidden;
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
  font-size: .8rem;
  font-weight: 400;
  justify-content: center;
  transition: .1s all ease-in-out;
  &:hover {
    color: ${props => props.selected ? '#fff' : colors.complementaryDark};
    cursor: ${props => props.selected ? 'initial' : 'pointer'};
  }
  @media (min-width: ${breakpoints.medium}) {
    font-size: 1rem;
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
  height: 100%;
  position: relative;
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
  position: absolute;
  top: .5rem;
`

const MeasureChords = styled.div`
  color: ${colors.primaryDark};
  display: flex;
  font-family: ${fonts.fira};
  font-size: .8rem;
  font-weight: 300;
  height: 100%;
  justify-content: space-around;
  @media (min-width: ${breakpoints.medium}) {
    font-size: 1rem;
  }
`

const Chord = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 100%;
  justify-content: center;
  transition: .1s all ease-in-out;
  width: 100%;
  &:hover {
    color: ${colors.complementaryDark};
  }
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

  playChord(chord) {
    this.props.playChord(chord)
  }

  stopChord(chord) {
    this.props.stopChord(chord)
  }

  currentKey() {
    // examples.length is tested in render method
    return this.props.musicalExamples[this.state.selectedChords].defaultKey
  }

  chordForAudioContext(chord) {
    return this.state.renderAnalysis ?
      ChordUtils.numeralToKey(chord, this.currentKey()) : chord
  }

  renderChords(chords) {
    return chords.map((chord, i) => {

      const audioChord = this.chordForAudioContext(chord)
      return (
        <Chord key={i}
          onMouseDown={this.playChord.bind(this, audioChord)}
          onMouseUp={this.stopChord.bind(this, audioChord)}
          onMouseLeave={this.stopChord.bind(this, audioChord)}
          onTouchStart={this.playChord.bind(this, audioChord)}
          onTouchEnd={this.stopChord.bind(this, audioChord)}
          onTouchMove={this.stopChord.bind(this, audioChord)}
        >
          {ChordUtils.prettyPrint(chord)}
        </Chord>
      )
    })
  }

  renderExample() {
    const example = this.props.musicalExamples[this.state.selectedChords]
    const measures = this.state.renderAnalysis ? example.chords : ChordUtils.numeralsToKey(example.chords, example.defaultKey)
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
    if (!this.props.musicalExamples || this.props.musicalExamples.length < 2) {
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