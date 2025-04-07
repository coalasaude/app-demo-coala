import { DateFilter } from '@/types/medicine'

export const MedicineNotificationFiltersDescription: Record<string, string> = {
  [DateFilter.TODAY]: 'Hoje',
  [DateFilter.AT_WEEK]: 'Na semana',
  [DateFilter.IN_THIS_MONTH]: 'No mês',
  [DateFilter.HOUR1]: '1 hora',
  [DateFilter.HOUR2]: '2 horas',
  [DateFilter.HOUR3]: '3 horas',
  [DateFilter.HOUR4]: '4 horas',
  [DateFilter.HOUR5]: '5 horas',
}

export const MedicineNotificationFiltersOptions = [
  {
    value: DateFilter.TODAY,
    label: MedicineNotificationFiltersDescription[DateFilter.TODAY],
  },
  {
    value: DateFilter.AT_WEEK,
    label: MedicineNotificationFiltersDescription[DateFilter.AT_WEEK],
  },
  {
    value: DateFilter.IN_THIS_MONTH,
    label: MedicineNotificationFiltersDescription[DateFilter.IN_THIS_MONTH],
  },
  {
    value: DateFilter.HOUR1,
    label: MedicineNotificationFiltersDescription[DateFilter.HOUR1],
  },
  {
    value: DateFilter.HOUR2,
    label: MedicineNotificationFiltersDescription[DateFilter.HOUR2],
  },
  {
    value: DateFilter.HOUR3,
    label: MedicineNotificationFiltersDescription[DateFilter.HOUR3],
  },
  {
    value: DateFilter.HOUR4,
    label: MedicineNotificationFiltersDescription[DateFilter.HOUR4],
  },
  {
    value: DateFilter.HOUR5,
    label: MedicineNotificationFiltersDescription[DateFilter.HOUR5],
  },
]
