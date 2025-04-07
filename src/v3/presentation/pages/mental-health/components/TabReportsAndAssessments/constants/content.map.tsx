import { ReportTimelineTypeEnum } from '@/v3/domain/@v2/mental-health/enums/timeline-type.enum'

import { RequestContent } from '../components/Contents/RequestContent/RequestContent'
import { ContentProps } from '../types/content.type'
import { ReportContent } from '../components/Contents/ReportContent/ReportContent'
import { AnalysisContent } from '../components/Contents/AnalysisContent/AnalysisContent'

type ContentMapType = Partial<
  Record<ReportTimelineTypeEnum, { component: (props: ContentProps) => JSX.Element }>
>

export const ContentMap: ContentMapType = {
  [ReportTimelineTypeEnum.MEDICAL_REPORT]: { component: ReportContent },
  [ReportTimelineTypeEnum.REQUEST_ANALYSIS]: { component: RequestContent },
  [ReportTimelineTypeEnum.MEDICIAL_ANALYSIS]: { component: AnalysisContent },
}
