import { Box } from '@mui/material'
import { usePostHog } from 'posthog-js/react'

import { useModalContext } from '@/v3/presentation/components/Modal'
import { useFetchBrowseMentalHealthMedicalAnalysis } from '@/v3/presentation/hooks/api/@v2/mental-health/reports/medical-analysis/useFetchBrowseMedicalAnalysis'
import { CButton } from '@/v3/presentation/newComponents'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'
import { useAvailableMentalHealthManage } from '@/v3/presentation/pages/users/components/hook/useAvailableMentalHealthManage'
import {
  POSTHOG_ACTIONS,
  POSTHOG_EVENTS,
  buildPath,
} from '@/v3/presentation/constants/posthog-events.constants'

import { FormAddMedicalAnalysis } from '../../Forms/FormAddMedicalAnalysis'
import { ModalPublicMedicalAnalysis } from '../../Modals/ModalPublicMedicalAnalysis/ModalPublicMedicalAnalysis'
import { SkeletonContent } from '../components/SkeletonContent/RequestContent'

import { AnalysisContentCard } from './AnalysisContentCard'

export const AnalysisContent = ({ id, userId }: { userId: number; id: number }) => {
  const { medicalAnalyses, isLoading } = useFetchBrowseMentalHealthMedicalAnalysis({
    userId,
    requestedAnalysisId: id,
  })
  const {
    permissionsMentalHealth: { canManageMedicalAnalysis, canManageRequestedAnalysis },
  } = useAvailableMentalHealthManage()
  const { handleModal } = useModalContext()
  const posthog = usePostHog()
  const { getCount } = usePageTimeCounter()

  const handlePublic = () => {
    posthog.capture(
      buildPath(POSTHOG_EVENTS.LEARNING.REQUESTED_ANALYSIS, POSTHOG_ACTIONS.PUBLISH),
      {
        time_on_page: getCount(),
      },
    )

    handleModal(<ModalPublicMedicalAnalysis userId={userId} requestedAnalysisId={id} />, {})
  }

  if (isLoading || !medicalAnalyses) {
    return <SkeletonContent />
  }

  return (
    <Box pb={4}>
      {medicalAnalyses.data.map((medicalAnalysis) => (
        <Box key={medicalAnalysis.id} mb={2}>
          <AnalysisContentCard medicalAnalysis={medicalAnalysis} userId={userId} />
        </Box>
      ))}

      {!!medicalAnalyses.canPublic && !medicalAnalyses.isPublic && canManageRequestedAnalysis && (
        <Box sx={{ mt: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <CButton
            variant='primary'
            onClick={handlePublic}
            disabled={medicalAnalyses.isPublic}
            sx={{ width: ['100%', 'auto'] }}
          >
            Liberar para o responsável
          </CButton>
        </Box>
      )}

      {canManageMedicalAnalysis && (
        <Box>
          <FormAddMedicalAnalysis userId={userId} requestedAnalysisId={id} />
        </Box>
      )}
    </Box>
  )
}
