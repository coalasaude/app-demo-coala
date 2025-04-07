import * as yup from 'yup'

import { InterestAreaCategory } from '@/v3/domain/@v2/mental-health/enums/pedagogical-area-type.enum'

import {
  FormFieldsAcademicProps,
  initiaAcademicValues,
} from './components/AreaOfInterestForm/components/AcademicForm/AcademicForm.type'
import { FormFieldsExtracurricularProps } from './components/AreaOfInterestForm/components/ExtracurricularForm/ExtracurricularForm.type'
import { FormFieldsOthersProps } from './components/AreaOfInterestForm/components/OthersForm/OthersForm.type'

export type FormFieldsInterestAreaProps = {
  category: InterestAreaCategory
  interestSubjectIds?: number[]
  proficientSubjectIds?: number[]
  observation?: string
  proficients?: string
  interests?: string
  title?: string
}

export type FormFieldsInterestAreasProps =
  | FormFieldsAcademicProps
  | FormFieldsExtracurricularProps
  | FormFieldsOthersProps

export interface FormFieldsProps {
  interestAreas: FormFieldsInterestAreasProps[]
}

export const schemaInterestAreas = yup.object({
  category: yup.string().required(),
  observation: yup.string().optional(),
  interestSubjectIds: yup
    .array()
    .of(yup.number())
    .when('category', {
      is: InterestAreaCategory.ACADEMIC,
      then: (schema) => schema.required('Campo obrigatório').min(1, 'Campo obrigatório'),
      otherwise: (schema) => schema.optional(),
    }),
  proficientSubjectIds: yup.array().of(yup.number()).optional(),
  interests: yup.string().when('category', {
    is: InterestAreaCategory.EXTRACURRICULAR,
    then: (schema) => schema.required('Campo obrigatório'),
    otherwise: (schema) => schema.optional(),
  }),
  proficients: yup.string().optional(),
  title: yup.string().when('category', {
    is: InterestAreaCategory.OTHERS,
    then: (schema) => schema.required('Campo obrigatório'),
    otherwise: (schema) => schema.optional(),
  }),
}) as any

export const schemaManyInterestAreas = yup.object({
  interestAreas: yup.array().min(1).of(schemaInterestAreas),
}) as any

export const initialInterestAreasValues = initiaAcademicValues as FormFieldsInterestAreaProps

export const initialValues = {
  interestAreas: [initialInterestAreasValues],
} as FormFieldsProps
