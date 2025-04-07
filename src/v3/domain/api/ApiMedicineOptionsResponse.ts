
export interface TApiMedicineConcentrationUnit {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date | null
}

export interface TApiMedicineDosageUnit {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date | null
}

export interface TApiScheduledMedicine {
  id: number
  name: string
  hour: number | null
  createdAt: Date
  updatedAt: Date | null
}


export interface TApiMedicineOptionsResponse {
  concentrationUnit: TApiMedicineConcentrationUnit[];
  dosageUnit: TApiMedicineDosageUnit[];
  scheduledMedicine: TApiScheduledMedicine[];
}
