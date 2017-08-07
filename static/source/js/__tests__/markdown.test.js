const markdown = require('../lib/markdown').default

describe('toHTML', () => {
  test('starts a new paragraph after double newline', () => {
    const input = 'abcdefg\n\nhijklmnop'
    expect(markdown.toHTML(input)).toBe('<p>abcdefg</p><p>hijklmnop</p>')
  })

  test('converts asteriks to em tags', () => {
    const input = 'abcdefg *hijklmnop* qrs *tuv*'
    expect(markdown.toHTML(input)).toBe('<p>abcdefg <em>hijklmnop</em> qrs <em>tuv</em></p>')
  })

  test('converts markdown links to anchor tags', () => {
    const input ='abcdefg [hijklmnop](www.qrstuv.com) wxyz'
    expect(markdown.toHTML(input)).toBe('<p>abcdefg <a href="www.qrstuv.com">hijklmnop</a> wxyz</p>')
  })
})