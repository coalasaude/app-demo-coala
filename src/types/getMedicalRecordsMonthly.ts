export interface GetMedicalRecordsMonthly {
  month: string
  medicalRecords: {
    classification: string
    _count: {
      id: number
    }
  }[]
}
