import {
  MentalHealthDifficultiesResultBrowseModel,
  MentalHealthDifficultiesResultBrowseModelConstructor,
} from './difficulties-result-browse.model'

export interface MentalHealthDifficultiesBrowseModelConstructor {
  data: MentalHealthDifficultiesResultBrowseModelConstructor[]
}

export class MentalHealthDifficultiesBrowseModel {
  public readonly data: MentalHealthDifficultiesResultBrowseModel[]

  constructor(params: MentalHealthDifficultiesBrowseModelConstructor) {
    this.data = params.data.map((result) => new MentalHealthDifficultiesResultBrowseModel(result))
  }
}
