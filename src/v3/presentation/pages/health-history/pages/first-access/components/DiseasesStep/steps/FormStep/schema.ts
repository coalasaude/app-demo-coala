import * as yup from 'yup'

import {
  initialDiseaseValues,
  schemaDiseaseOptions,
} from '../../../../../../components/FormDisease/schema'

export const schemaDisease = yup.object({
  ...schemaDiseaseOptions,
  document: yup.number().nullable().optional(),
})

export const schemaDiseases = yup.object({
  diseases: yup.array().min(1).of(schemaDisease),
})

export const initialDiseasesValues = {
  diseases: [{ ...initialDiseaseValues, document: undefined }],
}

export type IDiseasesFormFields = yup.InferType<typeof schemaDiseases>
