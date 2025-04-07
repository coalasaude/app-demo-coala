export function heightNormalizer(input: string) {
  if (!input) return
  const numericString = input.replace(/[^\d]/g, '')
  const paddedNumericString = numericString.padStart(3, '0')
  const formattedString = paddedNumericString.slice(0, -2) + ',' + paddedNumericString.slice(-2)
  const formattedStringWithoutZeros = formattedString.replace(/^0+(?=\d)/, '')
  return formattedStringWithoutZeros
}
