import React, { Component } from 'react'
import { PageLayout, PageTitle } from '../../../shared/pageLayout'
import styled from 'styled-components'
import { breakpoints, colors, fonts, zIndices } from '../../../styles'
import PianoSettingsConsole from './pianoSettingsConsole'
import PianoKeyboard from './pianoKeyboard'
import chordUtils from '../../../lib/chordUtils'


const MobileRotateNag = styled.div`
  align-items: center;
  color: #fff;
  background-color: ${colors.primaryDark};
  display: flex;
  font-family: ${fonts.fira};
  font-size: 1rem;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: ${zIndices.top};
  @media (min-width: ${breakpoints.mobileLandscape}) {
    display: none;
  }
`

const PianoWrapper = styled.div`
  border: 1px solid ${colors.primaryDark};
  border-radius: .15rem;
  max-width: 50rem;
  margin-top: 5rem;
  min-height: 20rem;
`

class Piano extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeKeys: [],
      baseKeyboardOctave: 3,
      displayMode: "chords",
      selectedChord: "Maj7",
      selectedKey: "Db",
      selectedScale: "Ionian"
    }
    this.playNote = this.playNote.bind(this)
    this.stopNote = this.stopNote.bind(this)
    this.playCurrentSelection = this.playCurrentSelection.bind(this)
    this.setBaseKeyboardOctave = this.setBaseKeyboardOctave.bind(this)
    this.setSelectedDisplayMode = this.setSelectedDisplayMode.bind(this)
    this.setSelectedChord = this.setSelectedChord.bind(this)
    this.setSelectedScale = this.setSelectedScale.bind(this)
    this.setSelectedKey = this.setSelectedKey.bind(this)
    this.setState = this.setState.bind(this)
  }

  playCurrentSelection() {
    const frequencies = this.selectedPianoKeys()
      .map((note) => chordUtils.noteToFrequency(note))
    this._playWithTimeout(frequencies, 400, 0)
  }

  _playWithTimeout(frequencies, timeout, i) {
    if (i > 0) {
      this.removeActiveKey(this.selectedPianoKeys()[i-1])
      this.props.stopFrequency(frequencies[i-1])
    }
    if (i < frequencies.length) { 
      this.addActiveKey(this.selectedPianoKeys()[i])
      this.props.playFrequency(frequencies[i])
      setTimeout(() => {
        this._playWithTimeout(frequencies, timeout, i+1)
      }, timeout)
    }
    return null
  }

  addActiveKey(note) {
    const keys = this.state.activeKeys
    keys.push(note)
    this.setState({activeKeys: keys})
  }

  removeActiveKey(note) {
    const activeIndex = this.state.activeKeys.indexOf(note)
    const keys = this.state.activeKeys.splice(activeIndex, activeIndex)
    this.setState({activeKeys: keys})
  }

  setBaseKeyboardOctave(value) {
    this.setState({baseKeyboardOctave: value})
  }

  setSelectedChord(chord) {
    this.setState({selectedChord: chord})
  }

  setSelectedScale(scale) {
    this.setState({selectedScale: scale})
  }

  setSelectedKey(key) {
    this.setState({selectedKey: key})
  }

  setSelectedDisplayMode(mode) {
    this.setState({displayMode: mode})
  }

  playNote(note) {
    this.addActiveKey(note)
    this.props.playFrequency(chordUtils.noteToFrequency(note))
  }

  stopNote(note) {
    this.removeActiveKey(note)
    this.props.stopFrequency(chordUtils.noteToFrequency(note))
  }


  selectedPianoKeys() {
    if (this.state.displayMode === "chords") {
      const chord = `${this.state.selectedKey}${this.state.selectedChord}`
      return chordUtils.chordToNotes(chord, this.state.baseKeyboardOctave)
    } else {
      return chordUtils.scaleToNotes(this.state.selectedKey, this.state.selectedScale, this.state.baseKeyboardOctave)
    }
  }

  render() {
    return (
      <PageLayout>
        <PageTitle>DbMaj7.com Chord & Scale Visualizer</PageTitle>
        <MobileRotateNag>
          Please rotate your phone for the awesome
        </MobileRotateNag>
        <PianoWrapper>
          <PianoSettingsConsole/>
          <PianoKeyboard
            activeKeys={this.state.activeKeys}
            baseKeyboardOctave={this.state.baseKeyboardOctave}
            selectedKeys={this.selectedPianoKeys()}
            playNote={this.playNote}
            stopNote={this.stopNote}
          />
        </PianoWrapper>
      </PageLayout>
    )
  }
}

export default Piano