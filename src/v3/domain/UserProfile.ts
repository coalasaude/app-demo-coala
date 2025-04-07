import { Profile } from '@/v3/domain/Profile'
import { Institution } from '@/v3/domain/Institution'

import { User } from './User'
import { TApiUserResponse } from './api/ApiUserResponse'
import { TApiInstitutionResponse } from './api/ApiInstitutionResponse'

export type TUserProfileOption = {
  id: number
  abbreviation?: string
  name: string
}

export interface TUserProfile {
  id: number
  profile_id: number
  profileId: number
  user_id: number
  userId: number
  user?: TApiUserResponse
  institution_id?: number
  institutionId: number
  institution?: TApiInstitutionResponse
  registration?: string
  is_coverage?: boolean
  is_health_leader?: boolean
  isHealthLeader?: boolean
  isCoverage: boolean
  profile?: Profile
  class?: string
  enrollment?: string
  companyPosition?: TUserProfileOption
  educationalStage?: TUserProfileOption
  schoolGrade?: TUserProfileOption
}

export class UserProfile {
  id?: number
  profileId?: number
  userId?: number
  user?: User
  institutionId?: number
  institution?: Institution
  profile?: Profile
  isHealthLeader?: boolean
  registration?: string
  class?: string
  enrollment?: string
  companyPosition?: TUserProfileOption
  educationalStage?: TUserProfileOption
  schoolGrade?: TUserProfileOption

  isCoverage?: boolean

  constructor(userProfile: TUserProfile) {
    this.id = userProfile?.id
    this.profileId = userProfile?.profile_id || userProfile?.profileId
    this.userId = userProfile?.user_id || userProfile?.userId
    this.user = userProfile?.user ? new User(userProfile.user) : undefined
    this.institutionId = userProfile?.institution_id || userProfile?.institutionId
    this.isHealthLeader = userProfile?.isHealthLeader || userProfile?.is_health_leader
    this.institution = userProfile?.institution
      ? new Institution(userProfile?.institution)
      : undefined
    this.registration = userProfile?.registration
    this.isCoverage = userProfile?.is_coverage || userProfile?.isCoverage
    this.class = userProfile?.class
    this.enrollment = userProfile?.enrollment
    this.companyPosition = userProfile?.companyPosition
    this.educationalStage = userProfile?.educationalStage
    this.schoolGrade = userProfile?.schoolGrade

    if (userProfile?.profile) {
      this.profile = new Profile(userProfile.profile)
    }

    if (userProfile?.user) {
      this.user = new User(userProfile.user)
    }
  }
}
