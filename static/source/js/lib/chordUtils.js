import constants from './constants'

const chordToNotes = (chord, octave=3) => {
  if (!isValidChord(chord)) {
    return []
  }
  const basePrefix = chord.match(/[A-G][b#]*/)[0]
  const baseSuffix = chord.split(/[A-G][b#]*/)[1]
  const offsets = constants.chordSuffixes[baseSuffix]
  const baseOffset = constants.keyArray.indexOf(basePrefix)
  return _offsetsToNotes(baseOffset, offsets, octave)
}

const isValidChord = (chord) => {
if (typeof chord === 'undefined' || chord.length === 0) {
    return false
  }
  return true
}

const scaleToNotes = (key, scale, octave=3) => {
  const offsets = constants.scales[scale]
  const baseOffset = constants.keyArray.indexOf(key)
  return _offsetsToNotes(baseOffset, offsets, octave)
}

const _offsetsToNotes = (baseValue, offsetValues, octave) => {
  const notes = []
  let previousNote = null
  let previousOctave = octave
  offsetValues.map((offset, i) => {
    const computed = baseValue + offset
    const letterName = constants.keyArray[computed % 12]
    if (!previousNote) {
      previousNote = letterName
    }
    const computedOctave = _computeOctave(previousNote, previousOctave, letterName)
    notes[i] = `${letterName}${computedOctave}`
    previousNote = letterName
    previousOctave = computedOctave
  })
  return notes
}

const _computeOctave = (previousNote, previousOctave, currentNote) => {
  const rootIndex = constants.keyArray.indexOf(previousNote)
  const cIndex = constants.keyArray.indexOf("C")
  const currentIndex = constants.keyArray.indexOf(currentNote)
  const newOctave = (
    ((rootIndex < cIndex) && (currentIndex < rootIndex)) ||
    ((rootIndex < cIndex) && (cIndex <= currentIndex)) ||
    ((cIndex < rootIndex) && (cIndex <= currentIndex) && (currentIndex < rootIndex))
  )
  return newOctave ? previousOctave + 1 : previousOctave
}

const noteToFrequency = (note) => {
  return constants.frequencies[note]
}

const numeralToKey = (numeral, key) => {
  const numeralObject = constants.romanNumerals[numeral]
  if (([undefined, null, ""].indexOf(numeral) > -1) ||
        (typeof numeralObject === 'undefined')) {
    return ""
  }
  const keyOffset = constants.keyArray.indexOf(key)
  const prefix = constants.keyArray[(keyOffset + numeralObject.offset) % 12]
  return `${prefix}${numeralObject.suffix}`
}

const numeralsToKey = (chordArray, targetKey) => {
  return chordArray.map((measure) => {
    return measure.map((chord) => {
      return numeralToKey(chord, targetKey)
    })
  })
}

const prettyPrint = (chordSymbol) => {
  return chordSymbol.replace('b', '♭').replace('#', '♯')
}

export default {
  chordToNotes: chordToNotes,
  noteToFrequency: noteToFrequency,
  numeralToKey: numeralToKey,
  numeralsToKey: numeralsToKey,
  prettyPrint: prettyPrint,
  scaleToNotes: scaleToNotes
}