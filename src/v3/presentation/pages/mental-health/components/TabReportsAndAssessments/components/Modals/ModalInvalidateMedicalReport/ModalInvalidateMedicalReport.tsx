import { Box, Divider, Typography } from '@mui/material'

import { FormButtons } from '@/v3/presentation/components/FormButtons'
import { ModalCard, useModalContext } from '@/v3/presentation/components/Modal'
import { useMutateDeleteMentalHealthReport } from '@/v3/presentation/hooks/api/@v2/mental-health/reports/report/useMutateDeleteMentalHealthReport'

import { IModalMedicalReportProps } from '.'

export function ModalDeleteMedicalReport({ userId, id }: IModalMedicalReportProps) {
  const invalidateMutation = useMutateDeleteMentalHealthReport()
  const { handleModal } = useModalContext()

  const onClose = () => {
    handleModal()
  }

  const onConfirm = () => {
    invalidateMutation.mutateAsync({ id: id, userId: userId }).finally(onClose)
  }

  return (
    <ModalCard title='Excluir' sx={{ width: ['100%', 385] }}>
      <Box mt={2}>
        <Typography variant='body1'>Deseja excluir este laudo?</Typography>
        <Typography variant='body1'>Esta ação não pode ser desfeita.</Typography>
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
