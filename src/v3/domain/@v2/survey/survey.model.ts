import { SurveyEnum } from './enum/survey.enum'

export interface SurveyModelConstructor {
  id: number
  name: SurveyEnum
  label: string
  answers: {
    id: number
    appointmentId: string
  }[]
}

export class SurveyModel {
  public readonly id: number
  public readonly name: SurveyEnum
  public readonly label: string
  public readonly answers: {
    id: number
    appointmentId: string
  }[]

  constructor(props: SurveyModelConstructor) {
    this.id = props.id
    this.name = props.name
    this.label = props.label
    this.answers = props.answers
  }
}
