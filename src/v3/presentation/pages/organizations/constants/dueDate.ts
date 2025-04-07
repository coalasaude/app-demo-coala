export enum DueDateType {
  EVERY_DAY_5 = 'EVERY_DAY_5',
  EVERY_DAY_10 = 'EVERY_DAY_10',
  EVERY_DAY_15 = 'EVERY_DAY_15',
  EVERY_DAY_20 = 'EVERY_DAY_20',
}

export const DUE_DATE_DESCRIPTION = {
  [DueDateType.EVERY_DAY_5]: 'Todo dia 5',
  [DueDateType.EVERY_DAY_10]: 'Todo dia 10',
  [DueDateType.EVERY_DAY_15]: 'Todo dia 15',
  [DueDateType.EVERY_DAY_20]: 'Todo dia 20',
}

export const DUE_DATE_OPTIONS = [
  {
    label: DUE_DATE_DESCRIPTION[DueDateType.EVERY_DAY_5],
    value: DueDateType.EVERY_DAY_5,
  },
  {
    label: DUE_DATE_DESCRIPTION[DueDateType.EVERY_DAY_10],
    value: DueDateType.EVERY_DAY_10,
  },
  {
    label: DUE_DATE_DESCRIPTION[DueDateType.EVERY_DAY_15],
    value: DueDateType.EVERY_DAY_15,
  },
  {
    label: DUE_DATE_DESCRIPTION[DueDateType.EVERY_DAY_20],
    value: DueDateType.EVERY_DAY_20,
  },
]
