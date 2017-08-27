const markdown = require('../lib/markdown').default

describe('toHTML', () => {
  test('starts a new paragraph after double newline', () => {
    const input = 'abcdefg\n\nhijklmnop'
    expect(markdown.toHTML(input)).toBe('<p>abcdefg</p><p>hijklmnop</p>')
  })

  test('converts asterisks to em tags', () => {
    const input = 'abcdefg *hijklmnop* qrs *tuv*'
    expect(markdown.toHTML(input)).toBe('<p>abcdefg <em>hijklmnop</em> qrs <em>tuv</em></p>')
  })

  test('converts markdown links to anchor tags', () => {
    const input ='abcdefg [hijklmnop](www.qrstuv.com) wxyz'
    expect(markdown.toHTML(input)).toBe('<p>abcdefg <a href="www.qrstuv.com">hijklmnop</a> wxyz</p>')
  })

  test('converts two markdown links to two anchor tags', () => {
    const input = 'click [this](/link1) or [this](/link2)'
    const expected = '<p>click <a href="/link1">this</a> or <a href="/link2">this</a></p>'
    expect(markdown.toHTML(input)).toBe(expected)
  })
})