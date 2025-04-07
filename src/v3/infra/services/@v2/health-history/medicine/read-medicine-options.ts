import {
  MedicineConcentrationUnitModel,
  MedicineConcentrationUnitModelConstructor,
} from '@/v3/domain/@v2/health-history/medicine/medicine-concentration-unit.model'
import {
  MedicineDosageUnitModel,
  MedicineDosageUnitModelConstructor,
} from '@/v3/domain/@v2/health-history/medicine/medicine-dosage-unit.model'
import {
  MedicineScheduledModel,
  MedicineScheduledModelConstructor,
} from '@/v3/domain/@v2/health-history/medicine/medicine-scheduled.model'

import apiRequest from '../../../api'

export type ReadMedicineOptionsResponse = {
  scheduledMedicine: MedicineScheduledModelConstructor[]
  concentrationUnit: MedicineConcentrationUnitModelConstructor[]
  dosageUnit: MedicineDosageUnitModelConstructor[]
}

export interface ReadMedicineOptionsParams {
  userId: number
}

export async function readMedicineOptions({ userId }: ReadMedicineOptionsParams) {
  const data = (await apiRequest<ReadMedicineOptionsResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/health-history/medicine-options',
    pathParams: { userId },
  })) as ReadMedicineOptionsResponse

  return {
    concentrationUnit: data.concentrationUnit.map(
      (item) => new MedicineConcentrationUnitModel(item),
    ),
    dosageUnit: data.dosageUnit.map((item) => new MedicineDosageUnitModel(item)),
    scheduledMedicine: data.scheduledMedicine.map((item) => new MedicineScheduledModel(item)),
  }
}
