import { formatDate } from '@/utils/formatDate'

import { AppFileModel } from '../../../@shared/app-file.model'
import { RecordTypeAnalysisEnum } from '../../enums/record-type-analysis.enum'

export interface InstitutionRequestedAnalysisModelConstructor {
  id: number
  userName: string
  userId: number
  requesterName: string
  createdAt: Date
  hasAnalysis: boolean
  image: AppFileModel | null
  recordType: RecordTypeAnalysisEnum
}

export class InstitutionRequestedAnalysisModel {
  readonly id: number
  readonly userId: number
  readonly userName: string
  readonly requesterName: string
  readonly createdAt: Date
  readonly hasAnalysis: boolean
  readonly image: AppFileModel | null
  readonly recordType: RecordTypeAnalysisEnum

  constructor(params: InstitutionRequestedAnalysisModelConstructor) {
    this.id = params.id
    this.userId = params.userId
    this.userName = params.userName
    this.requesterName = params.requesterName
    this.createdAt = params.createdAt
    this.hasAnalysis = params.hasAnalysis
    this.image = params.image
    this.recordType = params.recordType
  }

  get createdAtFormatted() {
    return formatDate(String(this.createdAt), 'DD/MM/YYYY')
  }

  getStatusFormatted() {
    if (this.hasAnalysis && this.recordType === RecordTypeAnalysisEnum.REQUESTED_ANALYSIS)
      return {
        label: 'Disponível',
        circleColor: '--mui-palette-success-main',
        bgColor: '--mui-palette-success-light',
      }
    if (!this.hasAnalysis && this.recordType === RecordTypeAnalysisEnum.REQUESTED_ANALYSIS)
      return {
        label: 'Aguardando análise',
        circleColor: '--mui-palette-info-main',
        bgColor: '--mui-palette-info-light',
      }

    if (this.recordType === RecordTypeAnalysisEnum.MEDICAL_REPORT)
      return {
        label: 'Laudo Adicionado',
        circleColor: '--mui-palette-warning-main',
        bgColor: '--mui-palette-warning-light',
      }

    return { label: '', circleColor: '--mui-palette-grey-400', bgColor: '--mui-palette-grey-100' }
  }
}
