import { Institution } from './institution'

export interface GeneralDataDashboard {
  institution: Institution
  students: number
  colaborators: number
  studentsWithMedicalRecord: number
  colaboratorsWithMedicalRecord: number
  studentsWithVaccine: number
}
