export const toNumber = (value: string) => {
  const parsed = Number(value)
  if (isNaN(parsed)) return 0
  return parsed
}
