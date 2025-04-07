import { RolesDescription } from '@/constants/roles'

export interface MentalHealthRequestedAnalysisModelConstructor {
  id: number
  reason: string
  createdAt: Date
  requesterName: string
  requesterProfile: string
  isEditable: boolean
  hasAnalysis: boolean
}

export class MentalHealthRequestedAnalysisModel {
  public readonly id: number
  public readonly reason: string
  public readonly createdAt: Date
  public readonly requesterName: string
  public readonly requesterProfile: string
  public readonly isEditable: boolean
  public readonly hasAnalysis: boolean

  constructor(props: MentalHealthRequestedAnalysisModelConstructor) {
    this.id = props.id
    this.reason = props.reason
    this.createdAt = props.createdAt
    this.requesterName = props.requesterName
    this.requesterProfile = props.requesterProfile
    this.isEditable = props.isEditable
    this.hasAnalysis = props.hasAnalysis
  }

  get requesterProfileName() {
    return RolesDescription[this.requesterProfile]
  }
}
