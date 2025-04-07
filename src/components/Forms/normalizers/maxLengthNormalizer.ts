export const maxLength = (max: number) => (value: string) => {
  if (typeof value === 'number') return value
  if (value) {
    const onlyNums = value.slice(0, max)
    return onlyNums
  }
  return value
}
