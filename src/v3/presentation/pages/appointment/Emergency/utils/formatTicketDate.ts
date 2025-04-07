import dayjs from 'dayjs'

export const formatTicketDate = (date: Date) => {
  const d = dayjs(date)
  const formattedDate = d.format('DD.MM.YYYY')
  const time = d.format('HH:mm')
  return `${formattedDate} | ${time}`
}
