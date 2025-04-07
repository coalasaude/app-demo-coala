import { InterestAreaCategory } from '../../enums/pedagogical-area-type.enum'

import {
  MentalHealthAreaOfInterestAcademicResultBrowseModel,
  MentalHealthAreaOfInterestAcademicResultBrowseModelConstructor,
} from './area-of-​​interest-academic-result-browse.model'
import {
  MentalHealthAreaOfInterestExtracurricularResultBrowseModel,
  MentalHealthAreaOfInterestExtracurricularResultBrowseModelConstructor,
} from './area-of-​​interest-extracurricular-result-browse.model'
import {
  MentalHealthAreaOfInterestOtherResultBrowseModel,
  MentalHealthAreaOfInterestOtherResultBrowseModelConstructor,
} from './area-of-​​interest-other-result-browse.model'

export interface MentalHealthAreaOfInterestBrowseModelConstructor {
  data: {
    [InterestAreaCategory.ACADEMIC]: MentalHealthAreaOfInterestAcademicResultBrowseModelConstructor[]
    [InterestAreaCategory.EXTRACURRICULAR]: MentalHealthAreaOfInterestExtracurricularResultBrowseModelConstructor[]
    [InterestAreaCategory.OTHERS]: MentalHealthAreaOfInterestOtherResultBrowseModelConstructor[]
  }
}

export class MentalHealthAreaOfInterestBrowseModel {
  public readonly data: {
    [InterestAreaCategory.ACADEMIC]: MentalHealthAreaOfInterestAcademicResultBrowseModel[]
    [InterestAreaCategory.EXTRACURRICULAR]: MentalHealthAreaOfInterestExtracurricularResultBrowseModel[]
    [InterestAreaCategory.OTHERS]: MentalHealthAreaOfInterestOtherResultBrowseModel[]
  }

  constructor(params: MentalHealthAreaOfInterestBrowseModelConstructor) {
    this.data = {
      [InterestAreaCategory.ACADEMIC]: params.data[InterestAreaCategory.ACADEMIC].map(
        (result) => new MentalHealthAreaOfInterestAcademicResultBrowseModel(result),
      ),
      [InterestAreaCategory.EXTRACURRICULAR]: params.data[InterestAreaCategory.EXTRACURRICULAR].map(
        (result) => new MentalHealthAreaOfInterestExtracurricularResultBrowseModel(result),
      ),
      [InterestAreaCategory.OTHERS]: params.data[InterestAreaCategory.OTHERS].map(
        (result) => new MentalHealthAreaOfInterestOtherResultBrowseModel(result),
      ),
    }
  }
}
