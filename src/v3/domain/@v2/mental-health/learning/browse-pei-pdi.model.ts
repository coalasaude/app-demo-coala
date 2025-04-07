import { CalendarSettingsDays, FrequencyInterval } from '@/constants/mentalHealth'
import { DefaultStatus } from '@/types/status'
import { PlanAIStatus } from '@/types/planAiStatus.enum'

import { UserModel } from '../../users/users.model'
import { AppFileModel } from '../../@shared/app-file.model'

import { BrowseCategoryTask } from './browse-category-task.model'

type BrowsePeiPdiConstructor = {
  id: number
  name?: string
  responsibleCollaborator: Partial<UserModel>
  patient: Partial<UserModel>
  frequency?: FrequencyInterval
  day?: CalendarSettingsDays[]
  duration?: number
  patientBirthday?: Date
  document: AppFileModel | null
  patientAge?: number
  planAIStatus?: PlanAIStatus
  conditionSuspicions?: string
  taskProgressPercent?: number
  difficulties?: string
  generalObjectives?: string
  description?: string
  status?: DefaultStatus
  category?: BrowseCategoryTask[]
}

export class BrowsePeiPdi {
  id: number
  name?: string
  responsibleCollaborator: Partial<UserModel>
  patient: Partial<UserModel>
  frequency?: FrequencyInterval
  day?: CalendarSettingsDays[]
  duration?: number
  patientBirthday?: Date
  patientAge?: number
  conditionSuspicions?: string
  taskProgressPercent?: number
  difficulties?: string
  generalObjectives?: string
  description?: string
  status?: DefaultStatus
  category?: BrowseCategoryTask[]
  planAIStatus?: PlanAIStatus
  document: AppFileModel | null

  constructor(params: BrowsePeiPdiConstructor) {
    this.id = params.id
    this.patient = params.patient
    this.responsibleCollaborator = params.responsibleCollaborator
    this.frequency = params.frequency
    this.day = params.day
    this.duration = params.duration
    this.patientBirthday = params.patientBirthday
    this.patientAge = params.patientAge
    this.conditionSuspicions = params.conditionSuspicions
    this.taskProgressPercent = params.taskProgressPercent
    this.difficulties = params.difficulties
    this.generalObjectives = params.generalObjectives
    this.description = params.description
    this.category = params.category
    this.status = params.status
    this.planAIStatus = params.planAIStatus
    this.document = params.document
  }
}
