import { Interval } from '@/types/plan'

export const IntervalTimes = {
  [Interval.DAY]: 'Diário',
  [Interval.WEEK]: 'Semanal',
  [Interval.MONTH]: 'Mensal',
  [Interval.YEAR]: 'Anual',
  ['']: '',
}

export const IntervalOptions = [
  {
    label: IntervalTimes[Interval.DAY],
    value: Interval.DAY,
  },
  {
    label: IntervalTimes[Interval.WEEK],
    value: Interval.WEEK,
  },
  {
    label: IntervalTimes[Interval.MONTH],
    value: Interval.MONTH,
  },
  {
    label: IntervalTimes[Interval.YEAR],
    value: Interval.YEAR,
  },
]
