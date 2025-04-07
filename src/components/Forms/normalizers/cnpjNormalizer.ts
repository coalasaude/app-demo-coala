export const cnpjNormalizer = (value: string) => {
  if (value) {
    const onlyNums = value.replace(/[^\d]/g, '')

    if (onlyNums.length <= 2) {
      return onlyNums
    }
    if (onlyNums.length <= 5) {
      return `${onlyNums.slice(0, 2)}.${onlyNums.slice(2, 5)}`
    }
    if (onlyNums.length <= 8) {
      return `${onlyNums.slice(0, 2)}.${onlyNums.slice(2, 5)}.${onlyNums.slice(5, 8)}`
    }

    if (onlyNums.length <= 12) {
      return `${onlyNums.slice(0, 2)}.${onlyNums.slice(2, 5)}.${onlyNums.slice(
        5,
        8
      )}/${onlyNums.slice(8, 12)}`
    }

    return `${onlyNums.slice(0, 2)}.${onlyNums.slice(2, 5)}.${onlyNums.slice(
      5,
      8
    )}/${onlyNums.slice(8, 12)}-${onlyNums.slice(12, 14)}`
  }
  return value
}
