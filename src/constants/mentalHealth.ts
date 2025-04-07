export enum CalendarSettingsDays {
  MONDAY = 'SEGUNDA',
  TUESDAY = 'TERCA',
  WEDNESDAY = 'QUARTA',
  THURSDAY = 'QUINTA',
  FRIDAY = 'SEXTA',
  SATURDAY = 'SABADO',
  SUNDAY = 'DOMINGO',
}

export enum FrequencyInterval {
  ONE = 'ONE',
  TWO = 'TWO',
  THREE = 'THREE',
  FOUR = 'FOUR',
  FIVE = 'FIVE',
  SIX = 'SIX',
  SEVEN = 'SEVEN',
}

export enum MentalHealthTaskStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  STUCK = 'STUCK',
}

const enum MentalHealthTaskStatusTranslation {
  NOT_STARTED = 'Não iniciado',
  IN_PROGRESS = 'Em andamento',
  COMPLETED = 'Concluído',
  STUCK = 'Travado',
}

export const statusDictionary = {
  [MentalHealthTaskStatus.NOT_STARTED]: MentalHealthTaskStatusTranslation.NOT_STARTED,
  [MentalHealthTaskStatus.IN_PROGRESS]: MentalHealthTaskStatusTranslation.IN_PROGRESS,
  [MentalHealthTaskStatus.COMPLETED]: MentalHealthTaskStatusTranslation.COMPLETED,
  [MentalHealthTaskStatus.STUCK]: MentalHealthTaskStatusTranslation.STUCK,
}

export const statusDictionaryReverse = {
  [MentalHealthTaskStatusTranslation.NOT_STARTED]: MentalHealthTaskStatus.NOT_STARTED,
  [MentalHealthTaskStatusTranslation.IN_PROGRESS]: MentalHealthTaskStatus.IN_PROGRESS,
  [MentalHealthTaskStatusTranslation.COMPLETED]: MentalHealthTaskStatus.COMPLETED,
  [MentalHealthTaskStatusTranslation.STUCK]: MentalHealthTaskStatus.STUCK,
}

export const MentalHealthStatusOptions = [
  {
    key: statusDictionary[MentalHealthTaskStatus.NOT_STARTED],
    bgColor: 'grey.300',
    txtColor: 'grey.500',
  },
  {
    key: statusDictionary[MentalHealthTaskStatus.IN_PROGRESS],
    bgColor: 'info.main',
    txtColor: 'white',
  },
  {
    key: statusDictionary[MentalHealthTaskStatus.COMPLETED],
    bgColor: 'success.main',
    txtColor: 'white',
  },
  { key: statusDictionary[MentalHealthTaskStatus.STUCK], bgColor: 'error.main', txtColor: 'white' },
]

export const MentalHealthStatusOptionsDictionary = {
  [MentalHealthTaskStatus.NOT_STARTED]: 0,
  [MentalHealthTaskStatus.IN_PROGRESS]: 1,
  [MentalHealthTaskStatus.COMPLETED]: 2,
  [MentalHealthTaskStatus.STUCK]: 3,
}

export const frequencyDictionary = {
  [FrequencyInterval.ONE]: '1 x na semana',
  [FrequencyInterval.TWO]: '2 x na semana',
  [FrequencyInterval.THREE]: '3 x na semana',
  [FrequencyInterval.FOUR]: '4 x na semana',
  [FrequencyInterval.FIVE]: '5 x na semana',
  [FrequencyInterval.SIX]: '6 x na semana',
  [FrequencyInterval.SEVEN]: '7 x na semana',
}

export const FrequencyIntervalToNumberDictionary = {
  [FrequencyInterval.ONE]: 1,
  [FrequencyInterval.TWO]: 2,
  [FrequencyInterval.THREE]: 3,
  [FrequencyInterval.FOUR]: 4,
  [FrequencyInterval.FIVE]: 5,
  [FrequencyInterval.SIX]: 6,
  [FrequencyInterval.SEVEN]: 7,
}

export const weekDaysDictionary = {
  [CalendarSettingsDays.MONDAY]: 'Seg.',
  [CalendarSettingsDays.TUESDAY]: 'Ter.',
  [CalendarSettingsDays.WEDNESDAY]: 'Qua.',
  [CalendarSettingsDays.THURSDAY]: 'Qui.',
  [CalendarSettingsDays.FRIDAY]: 'Sex.',
  [CalendarSettingsDays.SATURDAY]: 'Sáb.',
  [CalendarSettingsDays.SUNDAY]: 'Dom.',
}
