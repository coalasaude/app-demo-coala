export const cepNormalizer = (value: string) => {
  if (value) {
    const onlyNums = value.replace(/[^\d]/g, '')
    if (onlyNums.length <= 5) {
      return onlyNums
    }
    return `${onlyNums.slice(0, 5)}-${onlyNums.slice(5, 8)}`
  }
  return value
}
