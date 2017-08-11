import ChordUtils from '../lib/chordUtils'
import React, { Component } from 'react'

class AudioContext extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.ctx = this.newContext()
    this.oscillators = {}
    this.gainNodes = {}
    this.exceptions = 0;
  }

  newContext() {
    return new (window.AudioContext || window.webkitAudioContext)
  }

  playChord(chord) {
    ChordUtils.chordToNotes(chord)
      .map((note) => ChordUtils.noteToFrequency(note))
      .map((frequency) => this.playFrequency(frequency))
  }

  stopChord(chord) {
    ChordUtils.chordToNotes(chord)
      .map((note) => ChordUtils.noteToFrequency(note))
      .map((frequency) => this.stopFrequency(frequency))
  }


  playNotesWithTimeout(notes, timeout=400) {
    const freqs = notes
      .map((note) => ChordUtils.noteToFrequency(note))
    this._playWithTimeout(freqs, timeout, 0)
  }

  playFrequency(frequency) {
    const oscillator = this.ctx.createOscillator()
    const gainNode = this.ctx.createGain()
    gainNode.gain.setValueAtTime(.0001, this.ctx.currentTime)
    oscillator.connect(gainNode)
    gainNode.connect(this.ctx.destination)
    oscillator.frequency.value = frequency
    oscillator.start()
    gainNode.gain.exponentialRampToValueAtTime(1.0, this.ctx.currentTime + .025);
    this.oscillators[frequency] = oscillator
    this.gainNodes[frequency] = gainNode
  }

  stopFrequency(frequency) {
    if (this.gainNodes[frequency]) {
      this.gainNodes[frequency].gain.setTargetAtTime(
        0, this.ctx.currentTime, 0.025
      )
    }
  }

  render() {
    return (null)
  }
}

export default AudioContext