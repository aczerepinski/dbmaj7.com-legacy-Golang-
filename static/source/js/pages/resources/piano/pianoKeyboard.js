import React, { Component } from 'react'
import styled from 'styled-components'
import constants from '../../../lib/constants'
import PianoKey from './pianoKey'

const Keyboard = styled.div`
  display: flex;
  flex-direction: row;
  height: 300px;
`

class PianoKeyboard extends Component {
  renderKeys() {
    const activeKeys = this.props.activeKeys || []
    return constants.pianoKeys.map((key, i) => {
      const octave = this.props.baseKeyboardOctave + key.octaveOffset
      const fullName = `${key.letter}${octave}`
      return (
        <PianoKey
          color={key.color}
          isPlaying={activeKeys.indexOf(fullName) > -1}
          isSelected={this.props.selectedKeys.indexOf(fullName) > -1}
          key={fullName}
          fullName={fullName}
          letter={key.letter}
          playNote={this.props.playNote}
          stopNote={this.props.stopNote}
        />
      )
    })
  }

  render() {
    return (
      <Keyboard>
        {this.renderKeys()}
      </Keyboard>
    )
  }
}

export default PianoKeyboard