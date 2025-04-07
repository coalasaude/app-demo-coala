import { ReportProfileModel, ReportProfileModelConstructor } from './report-profiles.model'

export interface ReportProfileBrowseModelConstructor {
  data: ReportProfileModelConstructor[]
}

export class ReportProfileBrowseModel {
  public readonly data: ReportProfileModel[]

  constructor(props: ReportProfileBrowseModelConstructor) {
    this.data = props.data.map((ReportProfile) => new ReportProfileModel(ReportProfile))
  }
}
