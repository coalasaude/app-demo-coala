import dayjs from 'dayjs'

export function getDateFromHour(time: string) {
  if (!time) return time

  if (time.includes(':')) dayjs(time, 'H:mm').toDate()
  return dayjs(time, 'H').toDate()
}
