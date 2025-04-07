import { Typography } from '@mui/material'

import { CDialogue, useModalContext } from '@/v3/presentation/components/Modal'
import { useFetchReadSickNote } from '@/v3/presentation/hooks/api/@v2/appointment/sick-note/useFetchReadSickNote'
import { useMutateDeleteSickNote } from '@/v3/presentation/hooks/api/@v2/appointment/sick-note/useMutateDeleteSickNote'
import { CAccordion } from '@/v3/presentation/newComponents'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { useMutateRegenerateSickNote } from '@/v3/presentation/hooks/api/@v2/appointment/sick-note/useMutateRegenerateSickNote'

import { RecordContentProps } from '../../types/TRecords'
import { RecordContent } from '../RecordContent'

export const SickNoteContent = ({
  recordId,
  appointmentId,
  canManage,
  viewOverlay,
  onDeselect,
}: RecordContentProps) => {
  const { auth } = useAuth()
  const { sicknote } = useFetchReadSickNote({ sickNoteId: recordId, appointmentId: appointmentId })
  const { handleModal } = useModalContext()
  const invalidateSickNote = useMutateDeleteSickNote()
  const regenerateSickNote = useMutateRegenerateSickNote()

  const onInvalidate = async () => {
    await invalidateSickNote.mutateAsync({
      appointmentId,
      sickNoteId: recordId,
    })
  }

  const onRegenerate = async () => {
    await regenerateSickNote.mutateAsync({
      appointmentId,
      sickNoteId: recordId,
    })
  }

  const invalidate = () => {
    handleModal(
      <CDialogue
        title='Invalidar atestado'
        confirmButtonLabel='Sim'
        cancelButtonLabel='Não'
        onConfirm={onInvalidate}
        description={
          <>
            Tem certeza que deseja <b>invalidar</b> esse atestado?{' '}
          </>
        }
      />
    )
  }

  const regenerate = () => {
    handleModal(
      <CDialogue
        title='Regenerar atestado'
        confirmButtonLabel='Sim'
        cancelButtonLabel='Não'
        onConfirm={onRegenerate}
        description={
          <>
            Tem certeza que deseja <b>regenerar</b> esse atestado?{' '}
          </>
        }
      />
    )
  }

  return (
    <RecordContent
      onInvalidate={invalidate}
      title='Registro de atestado'
      canManage={canManage}
      viewOverlay={viewOverlay}
      record={sicknote}
      onClose={onDeselect}
      onRegenerate={auth.user?.isAdmin ? regenerate : undefined}
    >
      {!!sicknote && (
        <CAccordion title='Atestado médico' withDivider defaultExpanded>
          <Typography variant='body1' whiteSpace='pre-wrap'>
            {sicknote.body}
          </Typography>
          <br />
          <Typography variant='body2' fontWeight='bold'>
            CID-10:{' '}
            <Typography component='span'>
              {sicknote.cid
                ? `${sicknote.cid.code} - ${sicknote.cid?.codeDescription}`
                : 'Não informado'}
            </Typography>
          </Typography>
        </CAccordion>
      )}
    </RecordContent>
  )
}
