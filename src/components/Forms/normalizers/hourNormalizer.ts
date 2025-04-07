export const hourNormalizer = (value?: string) => {
  if (!value) return value

  if (!value.includes('h')) value = value.slice(0, -1)

  value = Number(value?.replace(/\D/g, '')).toString()

  if (value.length >= 4) return `${value.slice(0, 2)}:${value.slice(2, 4)}h`

  let minutes = value.slice(-2)
  let hours = value.slice(0, -2)

  if (hours.length < 2) hours = hours.padStart(2, '0')
  if (minutes.length < 2) minutes = minutes.padStart(2, '0')

  return `${hours}:${minutes}h`
}
