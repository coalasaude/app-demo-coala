import * as yup from 'yup'

export interface IMedicalAnalysisFormFields {
  analysis: string
}

export const schemaAnalysis = yup.object({
  analysis: yup.string().required(),
}) as any
