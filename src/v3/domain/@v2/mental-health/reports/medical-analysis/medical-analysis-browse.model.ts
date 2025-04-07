import {
  MentalHealthMedicalAnalysisResultBrowseModel,
  MentalHealthMedicalAnalysisResultBrowseModelConstructor,
} from './medical-analysis-result-browse.model'

export interface MentalHealthMedicalAnalysisModelConstructor {
  data: MentalHealthMedicalAnalysisResultBrowseModelConstructor[]
  isPublic: boolean
  canPublish: boolean
}

export class MentalHealthMedicalAnalysisModel {
  public readonly data: MentalHealthMedicalAnalysisResultBrowseModel[]
  public readonly isPublic: boolean
  public readonly canPublic: boolean

  constructor(params: MentalHealthMedicalAnalysisModelConstructor) {
    this.data = params.data.map(
      (result) => new MentalHealthMedicalAnalysisResultBrowseModel(result)
    )
    this.isPublic = params.isPublic
    this.canPublic = params.canPublish
  }
}
