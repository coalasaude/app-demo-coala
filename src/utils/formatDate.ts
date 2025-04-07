import dayjs from 'dayjs'

export const formatDate = (
  date: string | Date,
  format?: string,
  convertFormat?: string,
): string => {
  const momentDate = dayjs(date, convertFormat)

  if (!momentDate.isValid()) {
    return '-'
  }
  return momentDate.format(format || 'DD/MM/YYYY')
}
