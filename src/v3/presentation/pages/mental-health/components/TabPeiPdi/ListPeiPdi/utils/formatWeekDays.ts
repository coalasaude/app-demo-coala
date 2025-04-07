import { CalendarSettingsDays, weekDaysDictionary } from '@/constants/mentalHealth'

export const formatWeekDays = (weekDaysArray: CalendarSettingsDays[]): string => {
  if (!Array.isArray(weekDaysArray) || weekDaysArray.length === 0) {
    return 'Não cadastrado'
  }

  if (weekDaysArray.length === 1) return weekDaysDictionary[weekDaysArray[0]]

  const separator = weekDaysArray.length > 2 ? ', ' : ' e '

  return weekDaysArray.map((w) => weekDaysDictionary[w]).join(separator)
}
