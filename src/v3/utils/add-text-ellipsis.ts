interface AddEllipsisParams {
  text: string
  maxLength: number
  atEnd?: boolean
  middlePosition?: number
}

export function addTextEllipsis({
  text,
  maxLength,
  atEnd = true,
  middlePosition = Math.floor(text.length / 2),
}: AddEllipsisParams): string {
  if (text.length <= maxLength) {
    return text
  }

  if (atEnd) {
    return text.substring(0, maxLength) + '...'
  } else {
    if (middlePosition < 0 || middlePosition >= text.length) {
      return text
    }
    const remainingLength = maxLength - 3
    const startLength = Math.floor(remainingLength / 2)
    const endLength = remainingLength - startLength
    return text.substring(0, startLength) + '...' + text.substring(text.length - endLength)
  }
}
