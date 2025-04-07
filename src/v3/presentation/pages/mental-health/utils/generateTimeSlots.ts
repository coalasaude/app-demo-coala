import dayjs from 'dayjs'

export function generateTimeSlots(interval: number, date?: string | null | undefined) {
  const result = []
  const restTime = 10

  let currentTime = dayjs()
  let startDate

  if (date && dayjs(date).isSame(currentTime, 'day')) {
    startDate = dayjs().add(1, 'hours').startOf('hour')
  } else if (date) {
    startDate = dayjs(date).hour(6).minute(0)
  } else {
    startDate = dayjs().hour(6).minute(0)
  }

  currentTime = dayjs(startDate)

  while (currentTime.hour() < 24) {
    const startLabel = currentTime.format('HH:mm')
    const endTime = currentTime.clone().add(interval, 'minutes')
    const endLabel = endTime.format('HH:mm')

    result.push({
      label: `${startLabel} até ${endLabel}`,
      value: startLabel,
    })

    currentTime.add(interval + restTime, 'minutes')

    if (currentTime.isAfter(startDate.clone().add(1, 'day').startOf('day'))) {
      break
    }
  }

  return result
}
