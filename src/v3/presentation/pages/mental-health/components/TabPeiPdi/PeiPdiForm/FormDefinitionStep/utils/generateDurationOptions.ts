import dayjs from 'dayjs'

export const generateDurationOptions = () => {
  const options = []
  const start = dayjs().startOf('day')

  for (let minutes = 15; minutes <= 60; minutes += 15) {
    const time = start.add(minutes, 'minute').format('HH:mm')
    options.push({ label: time, value: minutes })
  }

  for (let minutes = 90; minutes < 1440; minutes += 30) {
    const time = start.add(minutes, 'minute').format('HH:mm')
    options.push({ label: time, value: minutes })
  }

  options.push({ label: '24:00', value: 1440 })

  return options
}
