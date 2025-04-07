import {
  PrescriptionModel,
  PrescriptionModelConstructor,
} from '@/v3/domain/@v2/appointment/prescription.model'

import apiRequest from '../../../api'

export type ReadPrescriptionResponse = PrescriptionModelConstructor

export interface ReadPrescriptionParams {
  prescriptionId: number
  appointmentId: number
}

export async function readPrescription({ appointmentId, prescriptionId }: ReadPrescriptionParams) {
  const data = (await apiRequest<ReadPrescriptionResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/appointments/:appointmentId/prescriptions/:prescriptionId',
    pathParams: { appointmentId, prescriptionId },
  })) as ReadPrescriptionResponse

  return new PrescriptionModel(data)
}
