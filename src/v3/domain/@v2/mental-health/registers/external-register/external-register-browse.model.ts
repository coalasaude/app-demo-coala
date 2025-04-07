import {
  MentalHealthExternalRegisterResultBrowseModel,
  MentalHealthExternalRegisterResultBrowseModelConstructor,
} from './external-register-result-browse.model'

export interface MentalHealthExternalRegisterBrowseModelConstructor {
  data: MentalHealthExternalRegisterResultBrowseModelConstructor[]
}

export class MentalHealthExternalRegisterBrowseModel {
  public readonly data: MentalHealthExternalRegisterResultBrowseModel[]

  constructor(params: MentalHealthExternalRegisterBrowseModelConstructor) {
    this.data = params.data.map(
      (result) => new MentalHealthExternalRegisterResultBrowseModel(result),
    )
  }
}
