import { ReportTimelineTypeEnum } from '@/v3/domain/@v2/mental-health/enums/timeline-type.enum'
import { useFetchBrowseReportTimeline } from '@/v3/presentation/hooks/api/@v2/mental-health/reports/timeline/useFetchBrowseTimeline'
import { CTooltip } from '@/v3/presentation/newComponents'
import { CTicketGroup } from '@/v3/presentation/newComponents/molecules/CTicketGroup'
import { Experimental_CTicket } from '@/v3/presentation/newComponents/molecules/Experimental_CTicket'

import { TimelineTypeMap } from '../../../../constants/timelineTypeMap'

export const TimelineList = ({
  itemId,
  itemType,
  userId,
  handleSelect,
}: {
  userId: number
  itemId: string
  itemType: ReportTimelineTypeEnum
  handleSelect: (itemId: string, itemType: ReportTimelineTypeEnum) => void
}) => {
  const { timeline } = useFetchBrowseReportTimeline({ userId })

  return (
    <CTicketGroup>
      {timeline.map((item) => {
        const data = TimelineTypeMap[item.type]

        return (
          <Experimental_CTicket
            key={item.id}
            title={data.label}
            description={
              <CTooltip description={item.description}>
                <div>{item.description}</div>
              </CTooltip>
            }
            selected={itemId === String(item.id) && itemType == item.type}
            icon={data.icon}
            onClick={() => handleSelect(String(item.id), item.type)}
          />
        )
      })}
    </CTicketGroup>
  )
}
