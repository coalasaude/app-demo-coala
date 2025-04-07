import { BehaviorType } from '../../enums/behavior-type.enum'

import {
  MentalHealthBehaviorResultBrowseModel,
  MentalHealthBehaviorResultBrowseModelConstructor,
} from './behavior-result-browse.model'

export interface MentalHealthBehaviorBrowseModelConstructor {
  data: [Record<BehaviorType, MentalHealthBehaviorResultBrowseModelConstructor[]>]
}

export class MentalHealthBehaviorBrowseModel {
  public readonly data: Record<BehaviorType, MentalHealthBehaviorResultBrowseModel[]>

  constructor(params: MentalHealthBehaviorBrowseModelConstructor) {
    const data = params.data[0]

    this.data = {
      [BehaviorType.EMOTIONAL]: data[BehaviorType.EMOTIONAL].map(
        (result) => new MentalHealthBehaviorResultBrowseModel(result),
      ),
      [BehaviorType.CHALLENGING]: data[BehaviorType.CHALLENGING].map(
        (result) => new MentalHealthBehaviorResultBrowseModel(result),
      ),
    }
  }
}
