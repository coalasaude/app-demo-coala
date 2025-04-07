import { InterestAreaCategory } from '@/v3/domain/@v2/mental-health/enums/pedagogical-area-type.enum'

export interface FormFieldsOthersProps {
  category: InterestAreaCategory.OTHERS
  title: string
  observation?: string
}
