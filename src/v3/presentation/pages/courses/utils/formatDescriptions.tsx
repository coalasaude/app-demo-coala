import ReactHtmlParser from 'react-html-parser'

export function formatDescriptions(description: string) {
  return description.split('\n').map((line, index, array) => (
    <span key={index}>
      {ReactHtmlParser(line)}
      {index === array.length - 1 ? null : <br />}
    </span>
  ))
}
