import { Box } from '@mui/material'

import { CDialogue, useModalContext } from '@/v3/presentation/components/Modal'
import { useFetchReadAttachment } from '@/v3/presentation/hooks/api/@v2/appointment/attachment/useFetchReadAttachment'
import { useMutateDeleteAttachment } from '@/v3/presentation/hooks/api/@v2/appointment/attachment/useMutateDeleteAttachment'
import { CAccordion } from '@/v3/presentation/newComponents'
import CChip from '@/v3/presentation/newComponents/atoms/CChip'

import { RecordContentProps } from '../../types/TRecords'
import { RecordContent } from '../RecordContent'

export const AttachmentContent = ({
  recordId,
  appointmentId,
  canManage,
  viewOverlay,
  onDeselect,
}: RecordContentProps) => {
  const { attachment } = useFetchReadAttachment({
    attachmentId: recordId,
    appointmentId: appointmentId,
  })
  const { handleModal } = useModalContext()
  const invalidateAttachment = useMutateDeleteAttachment()

  const onInvalidate = async () => {
    await invalidateAttachment.mutateAsync({
      appointmentId,
      attachmentId: recordId,
    })
  }

  const invalidate = () => {
    handleModal(
      <CDialogue
        title='Invalidar anexo'
        confirmButtonLabel='Sim'
        cancelButtonLabel='Não'
        onConfirm={onInvalidate}
        description={
          <>
            Tem certeza que deseja <b>invalidar</b> esse <br /> anexo?{' '}
          </>
        }
      />,
    )
  }

  const record = attachment
    ? {
        ...attachment,
        professional: attachment.user,
      }
    : undefined

  return (
    <RecordContent
      onInvalidate={invalidate}
      title='Registro de anexo'
      canManage={canManage}
      viewOverlay={viewOverlay}
      record={record}
      onClose={onDeselect}
      showCreator={false}
    >
      <CAccordion title='Anexos' withDivider defaultExpanded>
        <Box py={1}>
          <CChip
            variant={'outlined'}
            size={'small'}
            label={attachment?.title || ''}
            sx={{ '&:hover': { opacity: 1 } }}
          />
        </Box>
      </CAccordion>
    </RecordContent>
  )
}
