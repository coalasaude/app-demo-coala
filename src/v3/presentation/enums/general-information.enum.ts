export enum BloodType {
  A_POSITIVE = 'A_POSITIVE',
  A_NEGATIVE = 'A_NEGATIVE',
  B_POSITIVE = 'B_POSITIVE',
  B_NEGATIVE = 'B_NEGATIVE',
  AB_POSITIVE = 'AB_POSITIVE',
  AB_NEGATIVE = 'AB_NEGATIVE',
  O_POSITIVE = 'O_POSITIVE',
  O_NEGATIVE = 'O_NEGATIVE',
  NOT_INFORMED = 'NOT_INFORMED',
}

export const BloodTypeMapping: Record<string, BloodType> = {
  'A+': BloodType.A_POSITIVE,
  'A-': BloodType.A_NEGATIVE,
  'B+': BloodType.B_POSITIVE,
  'B-': BloodType.B_NEGATIVE,
  'AB+': BloodType.AB_POSITIVE,
  'AB-': BloodType.AB_NEGATIVE,
  'O+': BloodType.O_POSITIVE,
  'O-': BloodType.O_NEGATIVE,
  'Não Informado': BloodType.NOT_INFORMED,
}

export const BloodTypeValueMapping: Record<BloodType, string> = {
  [BloodType.A_POSITIVE]: 'A+',
  [BloodType.A_NEGATIVE]: 'A-',
  [BloodType.B_POSITIVE]: 'B+',
  [BloodType.B_NEGATIVE]: 'B-',
  [BloodType.AB_POSITIVE]: 'AB+',
  [BloodType.AB_NEGATIVE]: 'AB-',
  [BloodType.O_POSITIVE]: 'O+',
  [BloodType.O_NEGATIVE]: 'O-',
  [BloodType.NOT_INFORMED]: 'Não Informado',
}

export enum UrinaryFrequency {
  FREQ_1_3 = 'FREQ_1_3',
  FREQ_4_6 = 'FREQ_4_6',
  FREQ_7_9 = 'FREQ_7_9',
  LARGER_10 = 'LARGER_10',
  NOT_INFORMED = 'NOT_INFORMED',
}

export enum EvacuationFrequency {
  DIARY = 'DIARY',
  EVERY_2_DAYS = 'EVERY_2_DAYS',
  EVERY_3_DAYS = 'EVERY_3_DAYS',
  EVERY_4_DAYS = 'EVERY_4_DAYS',
  EVERY_5_DAYS = 'EVERY_5_DAYS',
  WEEKLY = 'WEEKLY',
  NOT_INFORMED = 'NOT_INFORMED',
}

export enum SleepQuality {
  SATISFACTORY = 'SATISFACTORY',
  INSOMNIA = 'INSOMNIA',
  DROWSINESS = 'DROWSINESS',
  WAKES_UP_REPEATEDLY = 'WAKES_UP_REPEATEDLY',
  NOT_INFORMED = 'NOT_INFORMED',
}

export enum WeeklyFrequencyExercise {
  FREQ_1_3 = 'FREQ_1_3',
  FREQ_4_6 = 'FREQ_4_6',
  DIARY = 'DIARY',
  NOT_INFORMED = 'NOT_INFORMED',
}
