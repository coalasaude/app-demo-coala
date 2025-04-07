import * as yup from 'yup'

import { BehaviorType } from '@/v3/domain/@v2/mental-health/enums/behavior-type.enum'

export type FormFieldsBehaviorProps = {
  type: BehaviorType
  title: string
  trigger: string
  description: string
}

export interface FormFieldsProps {
  behaviors: FormFieldsBehaviorProps[]
}

export const schemaBehaviors = yup.object({
  type: yup.string().required(),
  title: yup.string().required(),
  trigger: yup.string().optional(),
  description: yup.string().optional(),
}) as any

export const schemaManyBehavior = yup.object({
  behaviors: yup.array().min(1).of(schemaBehaviors),
}) as any

export const initialBehaviorsValues = {
  type: BehaviorType.EMOTIONAL,
  title: '',
  trigger: '',
  description: '',
} as FormFieldsBehaviorProps

export const initialValues = {
  behaviors: [initialBehaviorsValues],
} as FormFieldsProps
