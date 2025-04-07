import { CalendarSettingsDays, FrequencyInterval } from "@/constants/mentalHealth"

type AddPeiPdiConstructor = {
  name?: string
  responsibleCollaboratorId: number
  patientId: number
  frequency?: FrequencyInterval
  day?: CalendarSettingsDays[]
  duration?: number
  patientBirthday?: Date
  patientAge?: number
  conditionSuspicions?: string
  difficulties?: string
  generalObjectives?: string
  description?: string
}

export class AddPeiPdi {
  name?: string
  responsibleCollaboratorId: number
  patientId: number
  frequency?: FrequencyInterval
  day?: CalendarSettingsDays[]
  duration?: number
  patientBirthday?: Date
  patientAge?: number
  conditionSuspicions?: string
  difficulties?: string
  generalObjectives?: string
  description?: string

  constructor(params: AddPeiPdiConstructor) {
    this.patientId = params.patientId
    this.responsibleCollaboratorId = params.responsibleCollaboratorId
    this.frequency = params.frequency
    this.day = params.day
    this.duration = params.duration
    this.patientBirthday = params.patientBirthday
    this.patientAge = params.patientAge
    this.conditionSuspicions = params.conditionSuspicions
    this.difficulties = params.difficulties
    this.generalObjectives = params.generalObjectives
    this.description = params.description
  }
}