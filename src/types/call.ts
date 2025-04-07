export interface CallCount {
  id: number
  created_at: Date
  updated_at: Date | null
  countMedicalRecord: number
  countPrescription: number
  countReport: number
  countExam: number
  countAttachment: number
  countCid: number
  countSickNote: number
  count: number
}
