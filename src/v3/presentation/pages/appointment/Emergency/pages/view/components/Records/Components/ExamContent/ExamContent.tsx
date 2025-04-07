import { Typography } from '@mui/material'

import { CAccordion } from '@/v3/presentation/newComponents'
import { useFetchReadExam } from '@/v3/presentation/hooks/api/@v2/appointment/exam/useFetchReadExam'
import { useMutateDeleteExam } from '@/v3/presentation/hooks/api/@v2/appointment/exam/useMutateDeleteExam'
import { CDialogue, useModalContext } from '@/v3/presentation/components/Modal'
import { useMutateRegenerateExam } from '@/v3/presentation/hooks/api/@v2/appointment/exam/useMutateRegenerateExam'
import { useAuth } from '@/v3/presentation/hooks/useAuth'

import { RecordContentProps } from '../../types/TRecords'
import { RecordContent } from '../RecordContent'

export const ExamContent = ({
  recordId,
  appointmentId,
  canManage,
  viewOverlay,
  onDeselect,
}: RecordContentProps) => {
  const { auth } = useAuth()
  const { exam } = useFetchReadExam({ examId: recordId, appointmentId: appointmentId })
  const { handleModal } = useModalContext()
  const invalidateExam = useMutateDeleteExam()
  const regenerateExam = useMutateRegenerateExam()

  const onInvalidate = async () => {
    await invalidateExam.mutateAsync({
      appointmentId,
      examId: recordId,
    })
  }

  const onRegenerate = async () => {
    await regenerateExam.mutateAsync({
      appointmentId,
      examId: recordId,
    })
  }

  const invalidate = () => {
    handleModal(
      <CDialogue
        title='Invalidar exame'
        confirmButtonLabel='Sim'
        cancelButtonLabel='Não'
        onConfirm={onInvalidate}
        description={
          <>
            Tem certeza que deseja <b>invalidar</b> esse <br /> exame?{' '}
          </>
        }
      />
    )
  }

  const regenerate = () => {
    handleModal(
      <CDialogue
        title='Regenerar exame'
        confirmButtonLabel='Sim'
        cancelButtonLabel='Não'
        onConfirm={onRegenerate}
        description={
          <>
            Tem certeza que deseja <b>regenerar</b> esse <br /> exame?{' '}
          </>
        }
      />
    )
  }

  return (
    <RecordContent
      onInvalidate={invalidate}
      title='Registro de exame'
      canManage={canManage}
      viewOverlay={viewOverlay}
      record={exam}
      onClose={onDeselect}
      onRegenerate={auth.user?.isAdmin ? regenerate : undefined}
    >
      <CAccordion title='Exame' withDivider defaultExpanded>
        <Typography variant='body2' fontWeight={700}>
          Exame:{' '}
          <Typography variant='body2' component='span' whiteSpace='pre-wrap'>
            {exam?.description}
          </Typography>
        </Typography>

        <br />

        <Typography variant='body2' fontWeight={700}>
          Indicação:{' '}
          <Typography variant='body2' component='span' whiteSpace='pre-wrap'>
            {exam?.recommendation}
          </Typography>
        </Typography>
      </CAccordion>
    </RecordContent>
  )
}
