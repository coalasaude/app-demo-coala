import { RecordsType } from '@/types/records'

import AddAttachmentForm from './components/AddAttachmentForm/AddAttachmentForm'
import AddDiagnoseForm from './components/AddDiagnoseForm/AddDiagnoseForm'
import AddMedicalRecordForm from './components/AddMedicalRecord/AddMedicalRecordForm'
import AddPrescriptionForm from './components/AddPrescriptionForm/AddPrescriptionForm'
import AddSickNoteForm from './components/AddSickNoteForm/AddSickNoteForm'
import AddReportForm from './components/AddReportForm/AddReportForm'
import AddExamForm from './components/AddExamForm/AddExamForm'

export const contentMap = {
  [RecordsType.MEDICAL_RECORDS]: AddMedicalRecordForm,
  [RecordsType.SICKNOTE]: AddSickNoteForm,
  [RecordsType.REPORTS]: AddReportForm,
  [RecordsType.EXAM]: AddExamForm,
  [RecordsType.ATTACHMENTS]: AddAttachmentForm,
  [RecordsType.PRESCRIPTION]: AddPrescriptionForm,
  diagnosis: AddDiagnoseForm,
} as any

export const titleMap = {
  [RecordsType.MEDICAL_RECORDS]: 'Registro de atendimento',
  [RecordsType.SICKNOTE]: 'Registro de atestado',
  [RecordsType.REPORTS]: 'Registro de relatório',
  [RecordsType.EXAM]: 'Registro de exame',
  [RecordsType.ATTACHMENTS]: 'Registro de anexo',
  [RecordsType.PRESCRIPTION]: 'Registro de receituário',
  diagnosis: 'Registro de diagnóstico',
} as any
