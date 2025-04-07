import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import { ReactNode } from 'react'

import { ReportTimelineTypeEnum } from '@/v3/domain/@v2/mental-health/enums/timeline-type.enum'

export const TimelineTypeMap: Record<ReportTimelineTypeEnum, { label: string; icon?: ReactNode }> =
  {
    [ReportTimelineTypeEnum.MEDICAL_REPORT]: {
      label: 'Laudo',
    },
    [ReportTimelineTypeEnum.MEDICIAL_ANALYSIS]: {
      label: 'Análise',
    },
    [ReportTimelineTypeEnum.REQUEST_ANALYSIS]: {
      label: 'Solicitação de análise',
      icon: (
        <HealthAndSafetyIcon
          style={{ fontSize: 10 }}
          sx={{ width: 18, height: 18, color: 'var(--mui-palette-primary-main)' }}
        />
      ),
    },
  }
