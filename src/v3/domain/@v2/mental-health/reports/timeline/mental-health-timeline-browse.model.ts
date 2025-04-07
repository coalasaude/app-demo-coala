import {
  MentalHealthTimelineResultBrowseModel,
  MentalHealthTimelineResultBrowseModelConstructor,
} from './mental-health-timeline-result-browse.model'

export interface MentalHealthTimelineBrowseModelConstructor {
  data: MentalHealthTimelineResultBrowseModelConstructor[]
  canRequestAnalysis: boolean
}

export class MentalHealthTimelineBrowseModel {
  data: MentalHealthTimelineResultBrowseModel[]
  canRequestAnalysis: boolean

  constructor(params: MentalHealthTimelineBrowseModelConstructor) {
    this.data = params.data.map((result) => new MentalHealthTimelineResultBrowseModel(result))
    this.canRequestAnalysis = params.canRequestAnalysis
  }
}
