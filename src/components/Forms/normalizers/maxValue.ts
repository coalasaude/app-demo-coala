export const maxValue = (max: number) => (value: string | number) => {
  const number = Number(value)
  if (number <= max) {
    return number
  }

  return max
}
