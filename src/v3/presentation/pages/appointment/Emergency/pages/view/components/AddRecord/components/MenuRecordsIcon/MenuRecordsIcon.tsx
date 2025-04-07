import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined'
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined'
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined'

import DiagnosisIcon from 'public/assets/svg/AppointmentsView/DiagnosisIcon.svg'
import { RecordsType } from '@/types/records'

import { TMenuRecordsIcon } from '../AddRecordsList'

const size = 26
const iconStyle = {
  width: `${size}px`,
  height: `${size}px`,
}

export const MenuRecordsIcon: TMenuRecordsIcon[] = [
  {
    id: RecordsType.MEDICAL_RECORDS,
    label: 'Atendimento',
    icon: <HealthAndSafetyIcon style={iconStyle} />,
  },
  {
    id: RecordsType.PRESCRIPTION,
    label: 'Receituário',
    icon: <MedicationOutlinedIcon style={iconStyle} />,
  },
  {
    id: RecordsType.SICKNOTE,
    label: 'Atestado',
    icon: <DrawOutlinedIcon style={iconStyle} />,
  },
  {
    id: RecordsType.EXAM,
    label: 'Exame',
    icon: <MonitorHeartOutlinedIcon style={iconStyle} />,
  },
  {
    id: RecordsType.REPORTS,
    label: 'Relatório',
    icon: <SummarizeOutlinedIcon style={iconStyle} />,
  },
  {
    id: RecordsType.ATTACHMENTS,
    label: 'Anexos',
    icon: <AttachFileIcon style={iconStyle} />,
  },
  {
    id: 'diagnosis',
    label: 'Diagnóstico',
    icon: <DiagnosisIcon style={iconStyle} />,
  },
]
