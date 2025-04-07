import dayjs from 'dayjs'

export function formatTime(time: string) {
  if (!time) return time

  return dayjs(time).format('HH:mm')
}

export function formatMinutesToHours(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  return `${hours}:${remainingMinutes || '00'}h`
}
