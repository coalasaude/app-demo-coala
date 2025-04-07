import { InterestAreaCategory } from '@/v3/domain/@v2/mental-health/enums/pedagogical-area-type.enum'

export interface FormFieldsExtracurricularProps {
  category: InterestAreaCategory.EXTRACURRICULAR
  interests: string
  proficients?: string
  observation?: string
}
