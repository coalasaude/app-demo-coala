import { TApiMedicineResponse } from '@/v3/domain/medicine'
import { renameFile } from '@/v3/utils/rename-file'
import { onlyNumsNormalizer } from '@/components/Forms/normalizers/onlyNumsNormalizer'
import { TApiMedicineListResponse } from '@/v3/domain/api/ApiMedicineListResponse'

import apiRequest from './api'

export interface ApproveMedicinePayload {
  startHour?: number | null
  startDate?: Date | null
  isUsingMedicine: boolean
  id: number
  userId: number
}

export interface CreateMedicinePayload {
  name: string
  concentration: number
  medicineConcentrationUnitId: number
  dosage: number
  medicineDosageUnitId: number
  scheduledMedicineId: number
  observation: string
  recommendation?: string
  treatmentDays?: number
  startHour?: number
  startDate?: Date
  packagePhoto?: File | null
  prescriptionFile?: File | null
}

export interface CreateMedicinePrescriptionPayload {
  prescriptionFile: File
  medicines: CreateMedicinePayload[]
}

export interface CreateMedicinePrescriptionsPayload {
  userId: number
  prescriptions: CreateMedicinePrescriptionPayload[]
}

function createMedicineFormData({
  formData,
  medicine,
  prefix = '',
}: {
  formData: FormData
  prefix?: string
  medicine: CreateMedicinePayload
}) {
  formData.append(`${prefix}name`, medicine.name)
  formData.append(`${prefix}concentration`, String(medicine.concentration))
  formData.append(
    `${prefix}medicineConcentrationUnitId`,
    String(medicine.medicineConcentrationUnitId),
  )
  formData.append(`${prefix}dosage`, String(medicine.dosage))
  formData.append(`${prefix}medicineDosageUnitId`, String(medicine.medicineDosageUnitId))
  formData.append(`${prefix}scheduledMedicineId`, String(medicine.scheduledMedicineId))
  if (medicine.observation) {
    formData.append(`${prefix}observation`, medicine.observation)
  }
  if (medicine.recommendation) {
    formData.append(`${prefix}recommendation`, medicine.recommendation)
  }
  if (medicine.treatmentDays) {
    formData.append(`${prefix}treatmentDays`, String(medicine.treatmentDays))
  }
  if (medicine.startHour) {
    formData.append(`${prefix}startHour`, String(medicine.startHour))
  }
  if (medicine.startDate) {
    formData.append(`${prefix}startDate`, String(medicine.startDate))
  }
  if (medicine.packagePhoto) {
    const file = renameFile(
      medicine.packagePhoto,
      (name) => `${name}${onlyNumsNormalizer(prefix || '')}`,
    )

    formData.append(`packgePhotoFile`, file)
    formData.append(`${prefix}packagePhotoName`, file.name)
  }

  return formData
}

function createMedicinePrescriptionsFormData(
  formData: FormData,
  prescriptions: CreateMedicinePrescriptionPayload[],
) {
  prescriptions.forEach((prescription, prescriptionIndex) => {
    const prefix = `prescriptions[${prescriptionIndex}]`

    const file = renameFile(prescription.prescriptionFile, (name) => `${name}${prescriptionIndex}`)

    formData.append(`prescriptionFile`, file)
    formData.append(`${prefix}.prescriptionFileName`, file.name)

    prescription.medicines.forEach((medicine, medicineIndex) => {
      const medicinePrefix = `${prefix}.medicines[${medicineIndex}].`

      createMedicineFormData({ formData, medicine, prefix: medicinePrefix })
    })
  })
}

export const getMedicineList = async ({
  orderByField,
  filters,
  limit,
  offset,
  userId,
}: {
  userId: number
  orderByField?: string
  limit?: number
  offset?: number
  filters?: Record<string, any>
}) => {
  return apiRequest<TApiMedicineListResponse>({
    path: `user/:userId/health-history/medicine`,
    method: 'GET',
    useApiFilters: true,
    pathParams: { userId },
    queryParams: {
      ...filters,
      limit,
      offset,
      status: 'ACTIVE',
      order_by: orderByField,
    },
  })
}

export const getMedicineById = ({ userId, id }: { id: number; userId: number }) =>
  apiRequest<TApiMedicineResponse>({
    method: 'GET',
    path: `user/:userId/health-history/medicine/${id}`,
    pathParams: { userId },
  })

export const createMedicinePrescriptions = ({
  userId,
  ...payload
}: CreateMedicinePrescriptionsPayload) => {
  const formData = new FormData()
  createMedicinePrescriptionsFormData(formData, payload.prescriptions)

  return apiRequest({
    method: 'POST',
    path: 'user/:userId/health-history/medicine/prescriptions',
    body: formData,
    throwError: true,
    pathParams: { userId },
    cType: 'multipart/form-data',
  })
}

export const updateMedicine = ({
  userId,
  id,
  ...payload
}: CreateMedicinePayload & { id: number; userId: number }) => {
  const formData = new FormData()

  if (payload.prescriptionFile) formData.append(`prescriptionFile`, payload.prescriptionFile)
  createMedicineFormData({ formData, medicine: payload })

  return apiRequest<TApiMedicineResponse>({
    method: 'PUT',
    path: `user/:userId/health-history/medicine/${id}`,
    pathParams: { userId },
    throwError: true,
    body: formData,
    cType: 'multipart/form-data',
  })
}

export const approveMedicine = ({ userId, id, ...payload }: ApproveMedicinePayload) => {
  return apiRequest<TApiMedicineResponse>({
    method: 'PUT',
    path: `user/:userId/health-history/medicine/approve/${id}`,
    pathParams: { userId },
    throwError: true,
    body: payload,
  })
}

export const removeMedicine = ({ id, userId }: { id: number; userId: number }) => {
  return apiRequest({
    method: 'DELETE',
    path: `user/:userId/health-history/medicine/${id}`,
    useApiFilters: true,
    throwError: true,
    pathParams: { userId },
  })
}
