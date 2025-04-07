import { useRouter } from 'next/router'

import { useFetchBrowseTimeline } from '@/v3/presentation/hooks/api/@v2/appointment/appointment/useFetchBrowseTimeline'

import { WithStepModal } from './WithStepModal'
import { OnlyPasswordModal } from './OnlyPasswordModal'

export interface ModalCertificateProps {
  open?: boolean
  isLoading: boolean
  onClose: () => void
  handleSubmit: (certificatePass?: string) => Promise<void>
  isSubmitButtonDisabled?: boolean
  dontShowPassword?: boolean
}

export const ModalCertificate = ({
  open,
  onClose,
  isLoading,
  handleSubmit,
  isSubmitButtonDisabled,
}: ModalCertificateProps) => {
  const router = useRouter()
  const appointmentId = Number(router.query.id)
  const { timelineWithoutAttachments } = useFetchBrowseTimeline({ appointmentId })
  const hasRecords = timelineWithoutAttachments?.length && timelineWithoutAttachments.length > 0

  if (!hasRecords) {
    return <WithStepModal onClose={onClose} open={open} submitPassword={handleSubmit} />
  }

  return (
    <OnlyPasswordModal
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      onClose={onClose}
      isSubmitButtonDisabled={isSubmitButtonDisabled}
      open={open}
    />
  )
}
