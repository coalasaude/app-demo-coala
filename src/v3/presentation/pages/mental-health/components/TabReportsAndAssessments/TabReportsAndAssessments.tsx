import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { usePostHog } from 'posthog-js/react'

import { useBreakpoint } from '@/hooks/useBreakpoints'
import { ReportTimelineTypeEnum } from '@/v3/domain/@v2/mental-health/enums/timeline-type.enum'
import { UserModel } from '@/v3/domain/@v2/users/users.model'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { TabsContainerWrapper } from '@/v3/presentation/components/TabsContainer'
import TabsContainerHeader from '@/v3/presentation/components/TabsContainerHeader'
import { useFetchBrowseReportTimeline } from '@/v3/presentation/hooks/api/@v2/mental-health/reports/timeline/useFetchBrowseTimeline'
import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'
import {
  POSTHOG_ACTIONS,
  POSTHOG_EVENTS,
  buildPath,
} from '@/v3/presentation/constants/posthog-events.constants'

import { useAvailableMentalHealthManage } from '../../../users/components/hook/useAvailableMentalHealthManage'

import { AlertErrorManyRequests } from './components/AlertError/AlertErrorManyRequests'
import { ContentWrapper } from './components/Contents/components/ContentWrapper/ContentWrapper'
import EmptyReports from './components/EmptyReports/EmptyReports'
import { FormAddReport } from './components/Forms/FormAddReport'
import { FormAddRequestAnalysis } from './components/Forms/FormAddRequestAnalysis'
import { TimelineList } from './components/TimelineList/TimelineList'
import { ContentMap } from './constants/content.map'

export const TabReportsAndAssessments = ({ user }: { user: UserModel }) => {
  const { handleModal } = useModalContext()
  const {
    permissionsMentalHealth: { canManageRequestedAnalysis, canManageMedicalReport },
  } = useAvailableMentalHealthManage()
  const [alertError, setAlertError] = useState(false)
  const { timeline, data } = useFetchBrowseReportTimeline({ userId: user.id })
  const isMobile = useBreakpoint('sm')
  const { user: loggedUser } = useAuth()
  const posthog = usePostHog()
  const { getCount } = usePageTimeCounter()

  const { queryParam: reportId, replaceManyQueryParam } = useUrlQueryControl({
    queryName: 'reportId',
  })

  const { queryParam: reportType } = useUrlQueryControl({
    queryName: 'reportType',
  })

  const handleAddReport = () => {
    posthog.capture(buildPath(POSTHOG_EVENTS.LEARNING.MEDICAL_REPORT, POSTHOG_ACTIONS.CLICKED), {
      time_on_page: getCount(),
    })

    handleModal(<FormAddReport userId={user.id} />, {})
  }

  const handleAddRequestAnalysis = () => {
    if (data?.canRequestAnalysis) {
      handleModal(<FormAddRequestAnalysis userId={user.id} />, {})
    } else {
      setAlertError(true)
    }
  }

  const handleSelect = (reportId: string, reportType: ReportTimelineTypeEnum) => {
    replaceManyQueryParam({ reportId, reportType })
  }

  const handleDeseect = () => {
    replaceManyQueryParam({ reportId: null, reportType: null })
  }

  const handleCloseAlert = () => {
    setAlertError(false)
  }

  useEffect(() => {
    const canInitRecord = (!reportId || !reportType) && timeline.length && !isMobile

    if (canInitRecord) {
      const item = timeline[0]
      if (item) {
        replaceManyQueryParam({
          reportId: item.id,
          reportType: item.type,
        })
      }
    }
  }, [isMobile, timeline, replaceManyQueryParam, reportId, reportType])

  const isEmpty = timeline.length == 0
  const content = ContentMap[reportType as ReportTimelineTypeEnum]
  const isMangerOrCollab = loggedUser?.isManager || loggedUser?.isCollaborator
  const isResponsible = !!loggedUser && user?.findResponsible(loggedUser.id)
  const canAddDocument = canManageMedicalReport || isResponsible
  const canRequestAnalysis = isMangerOrCollab && canManageRequestedAnalysis

  return (
    <TabsContainerWrapper>
      <TabsContainerHeader
        label='Laudos e Relatórios'
        onClick={canAddDocument ? handleAddReport : undefined}
        buttonLabel={canAddDocument ? 'Adicionar documento' : undefined}
        buttonIcon={CloudUploadOutlinedIcon}
        secondaryButtonLabel={canRequestAnalysis ? 'Solicitar análise' : undefined}
        onSecondaryClick={canRequestAnalysis ? handleAddRequestAnalysis : undefined}
        secondaryButtonProps={{ disabled: isEmpty, sx: { width: ['220px', 'fit-content'] } }}
      />
      {isEmpty ? (
        <EmptyReports />
      ) : (
        <Box display='grid' gridTemplateColumns={['1fr', '256px 1fr']}>
          <TimelineList
            handleSelect={handleSelect}
            itemId={reportId}
            itemType={reportType as ReportTimelineTypeEnum}
            userId={user.id}
          />
          {content && (
            <ContentWrapper onClose={handleDeseect}>
              {alertError && <AlertErrorManyRequests onCloseAlert={handleCloseAlert} />}
              <content.component userId={user.id} id={Number(reportId)} />
            </ContentWrapper>
          )}
        </Box>
      )}
    </TabsContainerWrapper>
  )
}
