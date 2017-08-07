const toHTML = (string) => {
  return string.split(`\n\n`)
    .map(paragraph =>  `<p>${paragraph}</p>`)
    .join('')
    .replace(/(\*)(\w+)(\*)/g, '<em>$2</em>')
    .replace(/(\[)(\w+)(\])(\()(.+)(\))/g, '<a href="$5">$2</a>')
}

export default {
  toHTML: toHTML
}