import { InterestAreaCategory } from '@/v3/domain/@v2/mental-health/enums/pedagogical-area-type.enum'
import { MentalHealthAreaOfInterestAcademicResultBrowseModel } from '@/v3/domain/@v2/mental-health/registers/area-of-​​interest/area-of-​​interest-academic-result-browse.model'
import { MentalHealthAreaOfInterestExtracurricularResultBrowseModel } from '@/v3/domain/@v2/mental-health/registers/area-of-​​interest/area-of-​​interest-extracurricular-result-browse.model'
import { MentalHealthAreaOfInterestOtherResultBrowseModel } from '@/v3/domain/@v2/mental-health/registers/area-of-​​interest/area-of-​​interest-other-result-browse.model'

import { OthersCard } from '../components/OthersCard'
import { AreaContentProps } from '../types/area-content.type'
import { AcademicCard } from '../components/AcademicCard'
import { ExtracurricularCard } from '../components/ExtracurricularCard'

type ContentMapType = Record<
  InterestAreaCategory,
  { component: (props: AreaContentProps) => JSX.Element }
>

export const AreaContentMap: ContentMapType = {
  [InterestAreaCategory.ACADEMIC]: {
    component: (props) => (
      <AcademicCard
        {...props}
        model={props.model as MentalHealthAreaOfInterestAcademicResultBrowseModel}
      />
    ),
  },
  [InterestAreaCategory.EXTRACURRICULAR]: {
    component: (props) => (
      <ExtracurricularCard
        {...props}
        model={props.model as MentalHealthAreaOfInterestExtracurricularResultBrowseModel}
      />
    ),
  },
  [InterestAreaCategory.OTHERS]: {
    component: (props) => (
      <OthersCard
        {...props}
        model={props.model as MentalHealthAreaOfInterestOtherResultBrowseModel}
      />
    ),
  },
}
