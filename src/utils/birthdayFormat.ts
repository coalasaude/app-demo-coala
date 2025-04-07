import dayjs, { Dayjs } from 'dayjs'

export const birthdayFormat = (diff: Dayjs | Date, birthday: Dayjs | string) => {
  const date = dayjs(birthday)
  const today = dayjs(diff)
  const years = today.diff(date, 'years')

  if (years > 1) {
    return `${years} anos`
  }

  if (years === 1) {
    return `${years} ano`
  } else {
    const months = today.diff(date, 'months')
    const days = today.diff(date.add(months, 'months'), 'days')
    return `${months} meses e ${days} dias`
  }
}

export default birthdayFormat
