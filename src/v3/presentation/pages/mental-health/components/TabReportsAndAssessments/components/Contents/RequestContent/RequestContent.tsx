import { Box, Divider, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import EditIcon from '@mui/icons-material/EditOutlined'

import { useFetchReadReportRequestAnalysis } from '@/v3/presentation/hooks/api/@v2/mental-health/reports/request-analysis/useFetchReadRequestAnalysis'
import { CDisplayRecord } from '@/v3/presentation/newComponents'
import ButtonIcon from '@/v3/presentation/components/ButtonIcon'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { useAvailableMentalHealthManage } from '@/v3/presentation/pages/users/components/hook/useAvailableMentalHealthManage'

import { SkeletonContent } from '../components/SkeletonContent/RequestContent'
import { FormEditRequestAnalysis } from '../../Forms/FormEditRequestAnalysis'
import { FormAddMedicalAnalysis } from '../../Forms/FormAddMedicalAnalysis'

export const RequestContent = ({ id, userId }: { userId: number; id: number }) => {
  const {
    permissionsMentalHealth: { canManageMedicalAnalysis, canManageRequestedAnalysis },
  } = useAvailableMentalHealthManage()
  const { requestAnalysis, isLoading } = useFetchReadReportRequestAnalysis({ userId, id })
  const { handleModal } = useModalContext()

  const handleEditRequestAnalysis = () => {
    if (requestAnalysis)
      handleModal(
        <FormEditRequestAnalysis userId={userId} id={id} reason={requestAnalysis.reason} />,
        {},
      )
  }

  if (isLoading || !requestAnalysis) {
    return <SkeletonContent />
  }

  return (
    <Box>
      <Typography variant='h4' mb={[3, 2]}>
        Solicitação
      </Typography>

      <Box
        sx={{
          border: '1px solid var(--mui-palette-grey-200)',
          borderRadius: 2,
          p: 3,
          pb: 2,
          mb: 2,
        }}
      >
        <Stack alignItems='center' direction='row' justifyContent='space-between' mb={1.5}>
          <Typography variant='h4' mr={2}>
            Solicitação de análise
          </Typography>

          <Stack direction='row' alignItems='center' justifyContent='flex-end' flex={1} mb={'-2px'}>
            <Typography variant='body2' color='var(--mui-palette-grey-500)'>
              {dayjs(requestAnalysis.createdAt).format('DD/MM/YYYY')}{' '}
            </Typography>
            {requestAnalysis.isEditable && canManageRequestedAnalysis && (
              <Box mb={-1} mt={-1.5} mr={-1.5} ml='auto'>
                <ButtonIcon
                  icon={<EditIcon sx={{ fontSize: 18 }} />}
                  onClick={handleEditRequestAnalysis}
                />
              </Box>
            )}
          </Stack>
        </Stack>
        <Typography>{requestAnalysis.reason}</Typography>
        <Divider sx={{ mb: 1, mt: 2 }} />
        <Box display='grid' gridTemplateColumns={['2fr 1fr', '1fr 1fr']} mr={[0, 5]}>
          <CDisplayRecord
            label='Solicitante'
            withDivider={false}
            value={requestAnalysis.requesterName}
          />
          <CDisplayRecord
            label='Perfil'
            withDivider={false}
            value={requestAnalysis.requesterProfile}
          />
        </Box>
      </Box>

      {!requestAnalysis.hasAnalysis && canManageMedicalAnalysis && (
        <FormAddMedicalAnalysis userId={userId} requestedAnalysisId={id} />
      )}
    </Box>
  )
}
