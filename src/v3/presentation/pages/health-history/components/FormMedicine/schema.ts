import * as yup from 'yup'

import { FileAsync } from '@/types/FileAsync'
import { AuthorizationStatus } from '@/v3/domain/medicine'

export interface IMedicineFormFields {
  name: string
  concentration: number
  medicineConcentrationUnitId: number
  dosage: number
  medicineDosageUnitId: number
  scheduledMedicineId: number
  observation: string
  recommendation?: string
  treatmentDays?: number
  startHour?: Date | null
  startDate?: Date | null
  isSos: boolean
  isContinuousUsage: boolean
  packagePhoto?: FileAsync | null
  prescriptionFile?: FileAsync | null
  authorizationStatus?: AuthorizationStatus
}

export interface IApproveMedicineFormFields {
  startHour?: Date | null
  startDate?: Date | null
  isUsingMedicine: boolean
}

const schema = {
  name: yup.string().required(),
  concentration: yup.number().required(),
  medicineConcentrationUnitId: yup.number().required(),
  dosage: yup.number().required(),
  medicineDosageUnitId: yup.number().required(),
  scheduledMedicineId: yup.number().required(),
  isSos: yup.boolean().optional(),
  isContinuousUsage: yup.boolean().optional(),
  observation: yup.string().optional(),
  recommendation: yup.string().when('isSos', {
    is: (isSos: boolean) => isSos,
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.optional(),
  }),
  treatmentDays: yup.number().when('isContinuousUsage', {
    is: (isContinuousUsage: boolean) => !isContinuousUsage,
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.optional(),
  }),
  startHour: yup
    .date()
    .nullable()
    .when('isSos', {
      is: (isSos: boolean) => !isSos,
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.optional(),
    }),
  startDate: yup
    .date()
    .nullable()
    .when(['isSos', 'isContinuousUsage'], {
      is: (isSos: boolean, isContinuousUsage: boolean) => !isSos && !isContinuousUsage,
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.optional(),
    }),
  packagePhoto: yup.mixed(),
  authorizationStatus: yup.string().required(),
}

export const schemaMedicine = yup.object(schema)

export const schemaOneMedicine = yup.object({
  ...schema,
  prescriptionFile: yup.mixed().required(),
  packagePhoto: yup.mixed(),
})

export const schemaApproveMedicine = yup.object({
  isSos: yup.boolean().optional(),
  isContinuousUsage: yup.boolean().optional(),
  isUsingMedicine: yup.boolean().required(),
  startHour: yup
    .date()
    .nullable()
    .when(['isUsingMedicine', 'isSos'], {
      is: (isUsingMedicine: boolean, isSos: boolean) => !isSos && isUsingMedicine,
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.optional(),
    }),
  startDate: yup
    .date()
    .nullable()
    .when(['isUsingMedicine', 'isSos', 'isContinuousUsage'], {
      is: (isUsingMedicine: boolean, isSos: boolean, isContinuousUsage: boolean) =>
        !isSos && !isContinuousUsage && isUsingMedicine,
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.optional(),
    }),
})
