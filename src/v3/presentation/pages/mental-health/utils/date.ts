import dayjs from 'dayjs'

interface DateRangeFilterObject {
  value: string
  label: string
}

export function formatDateToPayload(inputDate: string): { startTo: string; startFrom: string } {
  const dateObj = new Date(inputDate)

  const formatDate = (date: Date): string => {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const startFrom = formatDate(dateObj)

  dateObj.setDate(dateObj.getDate() + 1)
  const startTo = formatDate(dateObj)

  return { startTo, startFrom }
}

export function formatISODateToString(date?: string | null): string {
  if (!date) {
    return ''
  }

  const dataDayjs = dayjs(new Date(date))
  const today = dayjs()
  const yesterday = dayjs().subtract(1, 'days')
  const tomorrow = dayjs().add(1, 'days')

  if (dataDayjs.isSame(today, 'day')) {
    return `Hoje, ${dataDayjs.format('D [de] MMMM')}`
  } else if (dataDayjs.isSame(yesterday, 'day')) {
    return `Ontem, ${dataDayjs.format('D [de] MMMM')}`
  } else if (dataDayjs.isSame(tomorrow, 'day')) {
    return `Amanhã, ${dataDayjs.format('D [de] MMMM')}`
  } else {
    return dataDayjs.format('D [de] MMMM')
  }
}

export function convertToISO(dateString: string, timeString: string): string | undefined {
  const date = new Date(dateString)
  if (isNaN(date.getTime())) {
    return undefined
  }
  const isoString = date.toISOString()
  const datePart = isoString.split('T')[0]
  const finalISOString = `${datePart}T${timeString}:00-03:00`

  return finalISOString
}

export function getYearlyDateRanges(
  year: number = new Date().getFullYear(),
): DateRangeFilterObject[] {
  const dateRanges: DateRangeFilterObject[] = []

  for (let month = 0; month < 12; month++) {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    const startFrom = `${year}-${(firstDay.getMonth() + 1).toString().padStart(2, '0')}-${firstDay
      .getDate()
      .toString()
      .padStart(2, '0')}`
    const startTo = `${year}-${(lastDay.getMonth() + 1).toString().padStart(2, '0')}-${lastDay
      .getDate()
      .toString()
      .padStart(2, '0')}`
    const label = `${(firstDay.getMonth() + 1).toString().padStart(2, '0')}/${year}`

    dateRanges.push({
      value: `{
        "startFrom": "${startFrom}",
        "startTo": "${startTo}"
      }`,
      label,
    })
  }

  return dateRanges
}

export function convertToBrDate(isoDate: string): string {
  const date = new Date(isoDate)
  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const year = date.getUTCFullYear()

  return `${day}/${month}/${year}`
}

export function incrementHour(time: string, hoursToBeAdded: number): string {
  const dayjsTime = dayjs(time, 'HH:mm')
  dayjsTime.add(hoursToBeAdded, 'hours')
  const newTime = dayjsTime.format('HH:mm')

  return newTime
}
