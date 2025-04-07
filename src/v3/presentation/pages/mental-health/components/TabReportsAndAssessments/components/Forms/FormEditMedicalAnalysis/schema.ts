import * as yup from 'yup'

export interface IMedicalAnalysisFormFields {
  analysis: string
}

export const schemaMedicalAnalysis = yup.object({
  analysis: yup.string().required(),
}) as any

export const initialValuesMedicalAnalysis = {
  analysis: '',
} as unknown as IMedicalAnalysisFormFields
