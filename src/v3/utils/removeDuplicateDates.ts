interface DateOptions<T> {
  dates?: T[]
  getDate?: (value: T) => Date
}

export function removeDuplicateDates<T>({
  dates,
  getDate = (value: T) => value as any,
}: DateOptions<T>) {
  if (!dates) return dates
  
  const uniqueDates = []
  const dateSet = new Set()

  for (const item of dates) {
    const date = getDate(item)
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`

    if (!dateSet.has(formattedDate)) {
      uniqueDates.push(item)
      dateSet.add(formattedDate)
    }
  }

  return uniqueDates
}

export function removeEqualDates<T,R>(toRemove: DateOptions<T>, toCompare: DateOptions<R>): T[] {
  if (!toRemove.dates || !toCompare.dates) return []

  const removeGetDate = toRemove.getDate || ((value: any) => new Date(value) as any)
  const compareGetDate = toCompare.getDate || ((value: any) => new Date(value) as any)

  return toRemove.dates.filter((date1) => !toCompare.dates?.some((date2) => isSameDate(removeGetDate(date1), compareGetDate(date2))))

}

function isSameDate(date1: Date, date2: Date) {
  return (
    date1?.getDate() === date2?.getDate() &&
    date1?.getMonth() === date2?.getMonth() &&
    date1?.getFullYear() === date2?.getFullYear()
  )
}
