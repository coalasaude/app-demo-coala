import { CompanyPositionModel, CompanyPositionModelConstructor } from '../company-position.model'
import { EducationalStageModel, EducationalStageModelConstructor } from '../educational-stage.model'
import { InstitutionModel, InstitutionModelConstructor } from '../insitution.model'
import { SchoolGradeModel, SchoolGradeModelConstructor } from '../school-grade.model'

import { ProfileModel, ProfileModelConstructor } from './profile.model'

export interface RoleModelConstructor {
  id: number
  profile: ProfileModelConstructor
  institution?: InstitutionModelConstructor
  healthRegister?: string
  isHealthLeader?: boolean
  class?: string
  enrollment?: string
  companyPosition?: CompanyPositionModelConstructor
  educationalStage?: EducationalStageModelConstructor
  schoolGrade?: SchoolGradeModelConstructor
}

export class RoleModel {
  public readonly id: number
  public readonly profile: ProfileModel
  public readonly institution?: InstitutionModel
  public readonly healthRegister?: string
  public readonly isHealthLeader?: boolean
  public readonly class?: string
  public readonly enrollment?: string
  public readonly companyPosition?: CompanyPositionModel
  public readonly educationalStage?: EducationalStageModel
  public readonly schoolGrade?: SchoolGradeModel

  constructor(data: RoleModelConstructor) {
    this.id = data.id
    this.healthRegister = data.healthRegister
    this.isHealthLeader = data.isHealthLeader
    this.class = data.class
    this.enrollment = data.enrollment

    this.profile = new ProfileModel(data.profile)
    this.institution = data.institution ? new InstitutionModel(data.institution) : undefined
    this.schoolGrade = data.schoolGrade ? new SchoolGradeModel(data.schoolGrade) : undefined
    this.companyPosition = data.companyPosition
      ? new CompanyPositionModel(data.companyPosition)
      : undefined
    this.educationalStage = data.educationalStage
      ? new EducationalStageModel(data.educationalStage)
      : undefined
  }
}
