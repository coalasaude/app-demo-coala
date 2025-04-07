import * as yup from 'yup'

export interface IRequestAnalysisFormFields {
  reason: string
}

export const schemaRequestAnalysis = yup.object({
  reason: yup.string().required(),
}) as any

export const initialValuesRequestAnalysis = {
  reason: '',
} as unknown as IRequestAnalysisFormFields
