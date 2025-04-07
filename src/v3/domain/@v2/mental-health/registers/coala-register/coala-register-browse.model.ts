import {
  MentalHealthCoalaRegisterResultBrowseModel,
  MentalHealthCoalaRegisterResultBrowseModelConstructor,
} from './coala-register-result-browse.model'

export interface MentalHealthCoalaRegisterBrowseModelConstructor {
  data: MentalHealthCoalaRegisterResultBrowseModelConstructor[]
}

export class MentalHealthCoalaRegisterBrowseModel {
  public readonly data: MentalHealthCoalaRegisterResultBrowseModel[]

  constructor(params: MentalHealthCoalaRegisterBrowseModelConstructor) {
    this.data = params.data.map((result) => new MentalHealthCoalaRegisterResultBrowseModel(result))
  }
}
