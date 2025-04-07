export function formatHour(time: string) {
  if (!time) return time

  const [hour, minute] = time?.split(':')
  return new Date(0, 0, 0, Number(hour), Number(minute || 0))
}
