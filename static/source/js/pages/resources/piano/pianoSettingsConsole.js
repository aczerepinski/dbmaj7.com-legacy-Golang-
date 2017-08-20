import React, { Component } from 'react'
import styled from 'styled-components'
import { breakpoints, colors, fonts } from '../../../styles'
import constants from '../../../lib/constants'
import ChordUtils from '../../../lib/chordUtils'

const Console = styled.div`
  background-color: ${colors.primaryDark};
`

const ConsoleRow = styled.div`
  border-bottom: 1px solid ${colors.backgroundDark};
  display: flex;
  flex-direction: row;
  padding: .5rem;
  &:last-child {
    border-bottom: none;
  }
`

const Label = styled.div`
  color: #fff;
  font-family: ${fonts.fira};
  font-size: .8rem;
  font-weight: 300;
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
  font-size: .8rem;
  font-weight: 400;
  height: 1.4rem;
  justify-content: center;
  transition: .1s all ease-in-out;
  width: 1.4rem;
  &:hover {
    color: ${props => props.isSelected ? '#fff' : colors.complementaryDark};
  }
`

class PianoSettingsConsole extends Component {
  constructor(props) {
    super(props)
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

  render() {
    return (
      <Console>
        <ConsoleRow>
          <Label>Settings:</Label>
        </ConsoleRow>
        <ConsoleRow>
          <Label>Selection:</Label>
        </ConsoleRow>
        <ConsoleRow>
          <Label>Key:</Label><ButtonGroup>{this.renderKeyButtons()}</ButtonGroup>
        </ConsoleRow>
      </Console>
    )
  }
}

export default PianoSettingsConsole