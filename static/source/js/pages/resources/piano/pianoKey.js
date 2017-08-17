import React from 'react'
import styled from 'styled-components'
import { breakpoints, colors, fonts, zIndices } from '../../../styles'

const BlackKey = styled.div`
  background-color: ${props => props.isPlaying ? colors.complementaryDark : props.isSelected ? '#aaa' : colors.primaryDark};
  border: 1px solid ${colors.primaryDark};
  border-radius: 0 0 2px 2px;
  border-top: 0;
  flex: 2;
  height: 66%;
  transition: .1s all ease-in-out;
  z-index: ${zIndices.mid};
  margin-left: -2.36%;
`

const WhiteKey = styled.div`
  background-color: ${props => props.isPlaying ? colors.complementaryDark : props.isSelected ? '#aaa' : '#fff'};
  border-left: 1px solid ${colors.primaryDark};
  flex: 3;
  height: 100%;
  margin-left: ${props => ['a', 'b', 'd', 'e', 'g'].indexOf(props.letter.toLowerCase()) >= 0 ? '-2.36%' : 'initial'};
  transition: .1s all ease-in-out;
  &:first-child {
    border-left: none;
  }
`

const PianoKey = (props) => {
  return props.color === 'white' ?
    (
      <WhiteKey 
        onMouseDown={() => props.playNote(props.fullName)}
        onMouseUp={() => props.stopNote(props.fullName)}
        onMouseLeave={() => props.stopNote(props.fullName)}
        onTouchStart={() => props.playNote(props.fullName)}
        onTouchEnd={() => props.stopNote(props.fullName)}
        onTouchMove={() => props.stopNote(props.fullName)}
        {...props}
      />
    )
    : (
    <BlackKey 
        onMouseDown={() => props.playNote(props.fullName)}
        onMouseUp={() => props.stopNote(props.fullName)}
        onMouseLeave={() => props.stopNote(props.fullName)}
        onTouchStart={() => props.playNote(props.fullName)}
        onTouchEnd={() => props.stopNote(props.fullName)}
        onTouchMove={() => props.stopNote(props.fullName)}
        {...props}
      />
    )
}

export default PianoKey