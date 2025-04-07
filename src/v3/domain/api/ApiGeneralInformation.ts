import {
  WeeklyFrequencyExercise,
  BloodType,
  UrinaryFrequency,
  EvacuationFrequency,
  SleepQuality,
} from '../../presentation/enums/general-information.enum'

export interface TApiGeneralInformation {
  id: number | null
  userId: number | null
  bloodType: BloodType | null
  blood_type: BloodType | null
  previousBloodTransfusion: boolean | null
  adverseReactionBloodTransfusion: boolean | null
  authorizedReceiveBloodTransfusion: boolean | null
  urinaryFrequency: UrinaryFrequency | null
  evacuationFrequency: EvacuationFrequency | null
  avarageHoursSleep: number | null
  sleepQuality: SleepQuality | null
  practiceExercises: boolean | null
  weeklyFrequencyExercise: WeeklyFrequencyExercise | null
  performedExercises: string | null
  illicitDrug: boolean | null
  smoke: boolean | null
  drinkAlcohol: boolean | null
  createdAt: Date | null
  updatedAt: Date | null
}
