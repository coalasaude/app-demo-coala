import { InterestAreaCategory } from '@/v3/domain/@v2/mental-health/enums/pedagogical-area-type.enum'
import { MentalHealthAreaOfInterestAcademicResultBrowseModel } from '@/v3/domain/@v2/mental-health/registers/area-of-​​interest/area-of-​​interest-academic-result-browse.model'
import { MentalHealthAreaOfInterestExtracurricularResultBrowseModel } from '@/v3/domain/@v2/mental-health/registers/area-of-​​interest/area-of-​​interest-extracurricular-result-browse.model'
import { MentalHealthAreaOfInterestOtherResultBrowseModel } from '@/v3/domain/@v2/mental-health/registers/area-of-​​interest/area-of-​​interest-other-result-browse.model'

export type AreaContentProps = {
  model:
    | MentalHealthAreaOfInterestAcademicResultBrowseModel
    | MentalHealthAreaOfInterestExtracurricularResultBrowseModel
    | MentalHealthAreaOfInterestOtherResultBrowseModel
  handleDelete: (id: number, category: InterestAreaCategory) => Promise<void>
  handleEdit: (id: number) => void
}
