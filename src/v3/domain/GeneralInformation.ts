import {
  WeeklyFrequencyExercise,
  BloodType,
  UrinaryFrequency,
  EvacuationFrequency,
  SleepQuality,
} from '../presentation/enums/general-information.enum'

import { TApiGeneralInformation } from './api/ApiGeneralInformation'

export class GeneralInformation {
  id: number | null
  userId: number | null
  bloodType: BloodType | null
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

  constructor(params: TApiGeneralInformation) {
    this.id = params.id
    this.userId = params.userId
    this.bloodType = params.bloodType
    this.previousBloodTransfusion = params.previousBloodTransfusion
    this.adverseReactionBloodTransfusion = params.adverseReactionBloodTransfusion
    this.authorizedReceiveBloodTransfusion = params.authorizedReceiveBloodTransfusion
    this.urinaryFrequency = params.urinaryFrequency
    this.evacuationFrequency = params.evacuationFrequency
    this.avarageHoursSleep = params.avarageHoursSleep
    this.sleepQuality = params.sleepQuality
    this.practiceExercises = params.practiceExercises
    this.weeklyFrequencyExercise = params.weeklyFrequencyExercise
    this.performedExercises = params.performedExercises
    this.illicitDrug = params.illicitDrug
    this.smoke = params.smoke
    this.drinkAlcohol = params.drinkAlcohol
    this.createdAt = params.createdAt
    this.updatedAt = params.updatedAt

    if (params.blood_type) {
      this.bloodType = params.blood_type
    }
  }
}
