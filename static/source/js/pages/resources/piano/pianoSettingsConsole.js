import React, { Component } from 'react'
import styled from 'styled-components'
import { breakpoints, colors, fonts } from '../../../styles'
import constants from '../../../lib/constants'
import ChordUtils from '../../../lib/chordUtils'
import { LeftArrow, RightArrow } from '../../../shared/icons/arrows'
import { Play } from '../../../shared/icons/controls'

const Console = styled.div`
  background-color: ${colors.primaryDark};
`

const ConsoleRow = styled.div`
  border-bottom: 1px solid ${colors.backgroundDark};
  display: flex;
  flex-direction: row;
  &:last-child {
    border-bottom: none;
  }
`

const ConsoleColumn = styled.div`
  align-items: center;
  border-right: 1px solid ${colors.backgroundDark};
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: .5rem;
  &:last-child {
    border-right: none;
  }
`

const Label = styled.div`
  color: #fff;
  font-family: ${fonts.fira};
  font-size: .7rem;
  font-weight: 300;
  min-width: 2.5rem;
  @media (min-width: ${breakpoints.medium}) {
    font-size: .8rem;
  }
`
const BrightLabel = Label.extend`
  color: ${colors.complementaryDark};
  font-weight: 400;
  margin-left: 1rem;
`

const ButtonGroup = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
`

const Button = styled.div`
  align-items: center;
  background-color: ${props => props.isSelected ? colors.complementaryDark : '#fff'};
  border-radius: 2px;
  color: ${props => props.isSelected ? '#fff' : colors.primaryDark};
  cursor: pointer;
  display: flex;
  font-family: ${fonts.fira};
  font-size: .6rem;
  font-weight: 400;
  height: 1.4rem;
  justify-content: center;
  transition: .1s all ease-in-out;
  width: 1.4rem;
  &:hover {
    color: ${props => props.isSelected ? '#fff' : colors.complementaryDark};
  }
  @media (min-width: ${breakpoints.medium}) {
    font-size: .8rem;
  }
`

const LargeButton = Button.extend`
  width: 2.5rem;
  @media (min-width: ${breakpoints.medium}) {
    width: 3.5rem;
  }
`

const GinormousButton = Button.extend`
  width: 4rem;
  @media (min-width: ${breakpoints.medium}) {
    width: 7rem;
  }
`

const SVGButton = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  svg {
    fill: #fff;
    height: 2rem;
    transition: .1s all ease-in-out;
  }
  &:hover {
    svg {
      fill: ${colors.complementaryDark};
    }
  }
`

const PlayButton = SVGButton.extend`
  margin-left: 1rem;
`

class PianoSettingsConsole extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chordPage: 1,
      chordsPerPage: 6,
      scalePage: 1,
      scalesPerPage: 4
    }
    this.paginate = this.paginate.bind(this)
    this.setState = this.setState.bind(this)

  }

  // 'by' should be an int, i.e. 1 or -1
  paginate(by) {
    let lastPage
    let stateKey
    if (this.props.displayMode === 'chords') {
      lastPage = Math.ceil(
        Object.keys(constants.chordSuffixes).length / this.state.chordsPerPage
      )
      stateKey = 'chordPage'
    } else {
      lastPage = Math.ceil(
        Object.keys(constants.scales).length / this.state.scalesPerPage
      )
      stateKey = 'scalePage'
    }
    const pages = [...Array(lastPage).keys()].map(x => x+1);
    const oldIndex = pages.indexOf(this.state[stateKey])
    if (oldIndex <= 0 && by < 0) {
      return this.setState({[stateKey]: lastPage})
    }
    const newIndex = (oldIndex + by) % pages.length
    const newPage = pages[newIndex]
    this.setState({[stateKey]: newPage})
  }

  renderKeyButtons() {
    return constants.keyArray.map((key) => {
      return (
        <Button
          key={key}
          isSelected={key === this.props.selectedKey}
          onClick={() => this.props.setSelectedKey(key)}
        >
        {ChordUtils.prettyPrint(key)}
        </Button>
      )
    })
  }

  renderChordOrScaleButtons() {
    return this.props.displayMode === 'chords' ?
      this.renderChordButtons() : this.renderScaleButtons()
  }

  renderChordButtons() {
    const i = (this.state.chordPage - 1) * this.state.chordsPerPage
    return (
      Object.keys(constants.chordSuffixes)
        .slice(i, (i + this.state.chordsPerPage))
        .map(chord => {
          return (
            <LargeButton
              key={chord}
              isSelected={chord === this.props.selectedChord}
              onClick={() => this.props.setSelectedChord(chord)}
            >
              {ChordUtils.prettyPrint(chord)}
            </LargeButton>
          )
        })
    )
  }

  renderScaleButtons() {
    const i = (this.state.scalePage - 1) * this.state.scalesPerPage
    return (
      Object.keys(constants.scales)
        .slice(i, (i + this.state.scalesPerPage))
        .map(scale => {
          return (
            <GinormousButton
              key={scale}
              isSelected={scale === this.props.selectedScale}
              onClick={() => this.props.setSelectedScale(scale)}
            >
              {ChordUtils.prettyPrint(scale)}
            </GinormousButton>
          )
        })
    )
  }

  selectedSuffix() {
    return this.props.displayMode === "chords" ?
      this.props.selectedChord :
      this.props.selectedScale
  }

  render() {
    return (
      <Console>
        <ConsoleRow>
          <ConsoleColumn>
            <Label>Mode:</Label>
            <ButtonGroup>
              <LargeButton
                isSelected={this.props.selectedDisplayMode === "chords"}
                onClick={() => this.props.setSelectedDisplayMode("chords")}
              >
                Chords
              </LargeButton>
              <LargeButton
                isSelected={this.props.selectedDisplayMode === "scales"}
                onClick={() => this.props.setSelectedDisplayMode("scales")}
              >
                Scales
              </LargeButton>
            </ButtonGroup>
          </ConsoleColumn>
          <ConsoleColumn>
            <Label>Keyboard Range:</Label>
            <ButtonGroup>
              <LargeButton
                isSelected={this.props.baseKeyboardOctave === 3}
                onClick={() => this.props.setBaseKeyboardOctave(3)}
              >
                C3 - C5
              </LargeButton>
              <LargeButton
                isSelected={this.props.baseKeyboardOctave === 4}
                onClick={() => this.props.setBaseKeyboardOctave(4)}
              >
                C4 - C6
              </LargeButton>
            </ButtonGroup>
          </ConsoleColumn>
          <ConsoleColumn>
            <Label>Current Selection:</Label>
            <BrightLabel>
            {ChordUtils.prettyPrint(this.props.selectedKey)} {this.selectedSuffix()}
            </BrightLabel>
            <PlayButton
              onClick={() => this.props.playCurrentSelection()}
            >
              <Play/>
            </PlayButton>
          </ConsoleColumn>
        </ConsoleRow>
        <ConsoleRow>
          <ConsoleColumn>
            <Label>{this.props.displayMode === 'chords' ? 'Chord:' : 'Scale:'}</Label>
            <SVGButton
              onClick={() => this.paginate(-1)}
            >
              <LeftArrow/>
            </SVGButton>
            <ButtonGroup>{this.renderChordOrScaleButtons()}</ButtonGroup>
            <SVGButton
              onClick={() => this.paginate(1)}
            >
              <RightArrow/>
            </SVGButton>
          </ConsoleColumn>
        </ConsoleRow>
        <ConsoleRow>
          <ConsoleColumn>
            <Label>Key:</Label>
            <ButtonGroup>{this.renderKeyButtons()}</ButtonGroup>
          </ConsoleColumn>
        </ConsoleRow>
      </Console>
    )
  }
}

export default PianoSettingsConsole