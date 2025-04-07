import { Box, Divider, Typography } from '@mui/material'

import { FormButtons } from '@/v3/presentation/components/FormButtons'
import { ModalCard, useModalContext } from '@/v3/presentation/components/Modal'
import { useMutateInvalidateMentalHealthMedicalAnalysis } from '@/v3/presentation/hooks/api/@v2/mental-health/reports/medical-analysis/useMutateInvalidateMedicalAnalysis'

import { IModalPublicMedicalAnalysisProps } from './types'

export function ModalInvalidateMedicalAnalysis({ userId, id }: IModalPublicMedicalAnalysisProps) {
  const invalidateMutation = useMutateInvalidateMentalHealthMedicalAnalysis()
  const { handleModal } = useModalContext()

  const onClose = () => {
    handleModal()
  }

  const onConfirm = () => {
    invalidateMutation.mutateAsync({ id: id, userId: userId }).finally(onClose)
  }

  return (
    <ModalCard title='Invalidar' sx={{ width: ['100%', 385] }}>
      <Box mt={2}>
        <Typography variant='body1'>Deseja invalidar esta análise?</Typography>
        <Typography variant='body1'>Lembrando que esta ação não pode ser desfeita.</Typography>
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
