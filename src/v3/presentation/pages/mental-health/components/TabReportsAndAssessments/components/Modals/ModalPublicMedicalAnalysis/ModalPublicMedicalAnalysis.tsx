import { Box, Divider, Typography } from '@mui/material'

import { FormButtons } from '@/v3/presentation/components/FormButtons'
import { ModalCard, useModalContext } from '@/v3/presentation/components/Modal'
import { useMutatePublicMentalHealthRequestAnalysis } from '@/v3/presentation/hooks/api/@v2/mental-health/reports/request-analysis/useMutatePublicRequestAnalysis'

import { IModalPublicMedicalAnalysisProps } from './types'

export function ModalPublicMedicalAnalysis({
  userId,
  requestedAnalysisId,
}: IModalPublicMedicalAnalysisProps) {
  const publicMutation = useMutatePublicMentalHealthRequestAnalysis()
  const { handleModal } = useModalContext()

  const onClose = () => {
    handleModal()
  }

  const onConfirm = () => {
    publicMutation.mutateAsync({ id: requestedAnalysisId, userId: userId }).finally(onClose)
  }

  return (
    <ModalCard title='Liberar a análise' sx={{ width: ['100%', 385] }}>
      <Box mt={2}>
        <Typography variant='body1'>Deseja liberar esta análise para os responsáveis?</Typography>
        <Typography variant='body1'>É bom lembrar que esta ação não pode ser desfeita.</Typography>
        <br />
        <Typography variant='body1'>Deseja continuar?</Typography>
        <Divider sx={{ display: ['flex', 'none'], mb: 3, mt: 2 }} />
        <FormButtons
          display='flex'
          mt={[3, 4]}
          gap={1}
          justifyContent='flex-end'
          confirmLabel='Sim'
          onConfirm={onConfirm}
          cancelLabel={'Não'}
          isLoading={false}
          disableConfirm={false}
          onCancel={onClose}
          minWidth={80}
        />
      </Box>
    </ModalCard>
  )
}
