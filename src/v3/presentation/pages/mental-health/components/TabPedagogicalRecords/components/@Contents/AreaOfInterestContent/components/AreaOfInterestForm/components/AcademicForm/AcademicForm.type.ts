import { InterestAreaCategory } from '@/v3/domain/@v2/mental-health/enums/pedagogical-area-type.enum'

export interface FormFieldsAcademicProps {
  category: InterestAreaCategory.ACADEMIC
  interestSubjectIds: number[]
  proficientSubjectIds: number[]
  observation?: string
}

export const initiaAcademicValues = {
  category: InterestAreaCategory.ACADEMIC,
  interestSubjectIds: [],
  proficientSubjectIds: [],
  observation: '',
} as FormFieldsAcademicProps
