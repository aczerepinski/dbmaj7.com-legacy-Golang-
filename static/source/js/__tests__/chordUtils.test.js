const ChordUtils = require('../lib/chordUtils').default
jest.unmock('../lib/constants')

describe('noteToFrequency', () => {
  test('given a valid note, returns a frequency', () => {
    expect(ChordUtils.noteToFrequency("C3")).toBe(130.81)
    expect(ChordUtils.noteToFrequency("C4")).toBe(261.63)
  })
})

describe('chordToNotes', () => {
  test('given a chord, returns an array of notes', () => {
    const eb7 = ["Eb3", "G3", "Bb3", "Db4"]
    const cMaj7 = ["C3", "E3", "G3", "B3"]
    const d7 = ["D3", "Gb3", "A3", "C4"]
    const bmin7 = ["B3", "D4", "Gb4", "A4"]
    expect(ChordUtils.chordToNotes("Eb7")).toEqual(eb7)
    expect(ChordUtils.chordToNotes("CMaj7")).toEqual(cMaj7)
    expect(ChordUtils.chordToNotes("D7")).toEqual(d7)
    expect(ChordUtils.chordToNotes("Bmin7")).toEqual(bmin7)
  })
})

describe('numeralsToKey', () => {
  test('transposes diatonic roman numerals', () => {
    const sourceArray = [["IMaj7"], ["IImin7", "IIImin7"], ["IVMaj7"]]
    const resultKeyOfDb = [["DbMaj7"], ["Ebmin7", "Fmin7"], ["GbMaj7"]]
    expect(ChordUtils.numeralsToKey(sourceArray, "Db")).toEqual(resultKeyOfDb)
  })

  test('transposes secondary dominant and subdominant roman numerals', () => {
    const sourceArray = [["II/II", "V7/II"], ["IImin7"], ["II/V", "V7/V"], ["V7"]]
    const resultKeyOfF = [["Amin7", "D7"], ["Gmin7"], ["Dmin7", "G7"], ["C7"]]
    expect(ChordUtils.numeralsToKey(sourceArray, "F")).toEqual(resultKeyOfF)
  })

  test('does not freak out if a measure does not contain a chord', () => {
    const sourceArray = [["IMaj7", ""], [""], ["", "VImin7"]]
    const resultKeyOfC = [["CMaj7", ""], [""], ["", "Amin7"]]
    expect(ChordUtils.numeralsToKey(sourceArray, "C")).toEqual(resultKeyOfC)
  })

  test('does not freak out if given an unknown roman numeral', () => {
    const sourceArray = [["tacos"], ["guacamole"]]
    expect(ChordUtils.numeralsToKey(sourceArray, "C").length)
      .toBe(sourceArray.length)
  })

  test('transposes blues chord roman numerals', () => {
    const sourceArray = [["I7"], ["IV7"], ["bVII7"], ["I7"]]
    const resultKeyOfEb = [["Eb7"], ["Ab7"], ["Db7"], ["Eb7"]]
    expect(ChordUtils.numeralsToKey(sourceArray, "Eb")).toEqual(resultKeyOfEb)
  })

  test('transposes substitute dominants', () => {
    const sourceArray = [["subV7"], ["subV7/II"], ["subV7/III"], ["subV7/IV"]]
    const resultKeyOfG = [["Ab7"], ["Bb7"], ["C7"], ["Db7"]]
    expect(ChordUtils.numeralsToKey(sourceArray, "G")).toEqual(resultKeyOfG)
  })
})

describe('scaleToNotes', () => {
  test('given a key and scale, returns an array of notes', () => {
    const cIonian = ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4"]
    expect(ChordUtils.scaleToNotes("C", "Ionian")).toEqual(cIonian)
  })
})

describe('prettyPrint', () => {
  test('replaces b with ♭ in chord symbols', () => {
    expect(ChordUtils.prettyPrint('DbMaj7')).toEqual('D♭Maj7')
  })

  test('does not replace b in sub', () => {
    expect(ChordUtils.prettyPrint('subV7/II')).toEqual('subV7/II')
  })
})