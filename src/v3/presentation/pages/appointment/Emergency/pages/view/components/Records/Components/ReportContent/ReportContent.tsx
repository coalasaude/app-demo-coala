import { Typography } from '@mui/material'

import { CDialogue, useModalContext } from '@/v3/presentation/components/Modal'
import { useFetchReadReport } from '@/v3/presentation/hooks/api/@v2/appointment/report/useFetchReadReport'
import { useMutateDeleteReport } from '@/v3/presentation/hooks/api/@v2/appointment/report/useMutateDeleteReport'
import { CAccordion } from '@/v3/presentation/newComponents'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { useMutateRegenerateReport } from '@/v3/presentation/hooks/api/@v2/appointment/report/useMutateRegenerateReport'

import { RecordContentProps } from '../../types/TRecords'
import { RecordContent } from '../RecordContent'

export const Reportcontent = ({
  recordId,
  appointmentId,
  canManage,
  viewOverlay,
  onDeselect,
}: RecordContentProps) => {
  const { auth } = useAuth()
  const { report } = useFetchReadReport({ reportId: recordId, appointmentId: appointmentId })
  const { handleModal } = useModalContext()
  const invalidateReport = useMutateDeleteReport()
  const regenerateReport = useMutateRegenerateReport()

  const onInvalidate = async () => {
    await invalidateReport.mutateAsync({
      appointmentId,
      reportId: recordId,
    })
  }

  const onRegenerate = async () => {
    await regenerateReport.mutateAsync({
      appointmentId,
      reportId: recordId,
    })
  }

  const invalidate = () => {
    handleModal(
      <CDialogue
        title='Invalidar relatório'
        confirmButtonLabel='Sim'
        cancelButtonLabel='Não'
        onConfirm={onInvalidate}
        description={
          <>
            Tem certeza que deseja <b>invalidar</b> esse <br /> relatório?{' '}
          </>
        }
      />
    )
  }

  const regenerate = () => {
    handleModal(
      <CDialogue
        title='Regenerar relatório'
        confirmButtonLabel='Sim'
        cancelButtonLabel='Não'
        onConfirm={onRegenerate}
        description={
          <>
            Tem certeza que deseja <b>regenerar</b> esse <br /> relatório?{' '}
          </>
        }
      />
    )
  }

  return (
    <RecordContent
      onInvalidate={invalidate}
      title='Registro de relatório'
      canManage={canManage}
      viewOverlay={viewOverlay}
      record={report}
      onClose={onDeselect}
      onRegenerate={auth.user?.isAdmin ? regenerate : undefined}
    >
      <CAccordion title={report?.title || 'Relatório'} withDivider defaultExpanded>
        <Typography variant='body1' whiteSpace='pre-wrap'>
          {report?.body}
        </Typography>
      </CAccordion>
    </RecordContent>
  )
}
