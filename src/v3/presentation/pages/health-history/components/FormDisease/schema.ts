import * as yup from 'yup'

import { otherDiseasesId } from '../../constant/other-diseases.const'

export const schemaDiseaseOptions = {
  disease: yup.string().required(),
  dateDiagnosis: yup.date().required(),
  haveTreatment: yup.boolean().required(),
  observation: yup.string().optional(),
  otherDisease: yup.string().when(['disease'], {
    is: (disease: string) => disease == otherDiseasesId,
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.optional(),
  }),
  document: yup.mixed<File>().nullable().optional(),
}

export const schemaDisease = yup.object(schemaDiseaseOptions)

export type IDiseaseFormFields = yup.InferType<typeof schemaDisease>

export const initialDiseaseValues = {
  disease: '' as number | string,
  dateDiagnosis: '',
  haveTreatment: true,
  observation: '',
  document: null as File | null,
} as unknown as IDiseaseFormFields
