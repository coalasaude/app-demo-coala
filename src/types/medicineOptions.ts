import { MedicineConcentrationUnit, MedicineDosageUnit, ScheduledMedicine } from './medicine'

export interface MedicineOptions {
  concentrationUnit: MedicineConcentrationUnit[]
  dosageUnit: MedicineDosageUnit[]
  scheduledMedicine: ScheduledMedicine[]
}
