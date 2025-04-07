import { Typography } from '@mui/material'

import { PrescriptionType } from '@/types/records'
import { CDialogue, useModalContext } from '@/v3/presentation/components/Modal'
import { useFetchReadPrescription } from '@/v3/presentation/hooks/api/@v2/appointment/prescription/useFetchReadPrescription'
import { useMutateDeletePrescription } from '@/v3/presentation/hooks/api/@v2/appointment/prescription/useMutateDeletePrescription'
import { CAccordion } from '@/v3/presentation/newComponents'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { useMutateRegeneratePrescription } from '@/v3/presentation/hooks/api/@v2/appointment/prescription/useMutateRegeneratePrescription'

import { RecordContentProps } from '../../types/TRecords'
import { RecordContent } from '../RecordContent'

export const PrescriptionContent = ({
  recordId,
  appointmentId,
  canManage,
  viewOverlay,
  onDeselect,
}: RecordContentProps) => {
  const { auth } = useAuth()
  const { prescription } = useFetchReadPrescription({
    prescriptionId: recordId,
    appointmentId: appointmentId,
  })

  const { handleModal } = useModalContext()
  const invalidatePrescriotion = useMutateDeletePrescription()
  const regeneratePrescription = useMutateRegeneratePrescription()

  const onInvalidate = async () => {
    await invalidatePrescriotion.mutateAsync({
      appointmentId,
      prescriptionId: recordId,
    })
  }

  const onRegenerate = async () => {
    await regeneratePrescription.mutateAsync({
      appointmentId,
      prescriptionId: recordId,
    })
  }

  const invalidate = () => {
    handleModal(
      <CDialogue
        title='Invalidar receituário'
        confirmButtonLabel='Sim'
        cancelButtonLabel='Não'
        onConfirm={onInvalidate}
        description={
          <>
            Tem certeza que deseja <b>invalidar</b> esse <br /> receituário?{' '}
          </>
        }
      />
    )
  }

  const regenerate = () => {
    handleModal(
      <CDialogue
        title='Regenerar receituário'
        confirmButtonLabel='Sim'
        cancelButtonLabel='Não'
        onConfirm={onRegenerate}
        description={
          <>
            Tem certeza que deseja <b>regenerar</b> esse <br /> receituário?{' '}
          </>
        }
      />
    )
  }

  const title =
    prescription?.type === PrescriptionType.ESPECIAL
      ? 'Receituário controle especial'
      : 'Receituário simples'

  return (
    <RecordContent
      onInvalidate={invalidate}
      title='Registro de receituário'
      canManage={canManage}
      viewOverlay={viewOverlay}
      record={prescription}
      onClose={onDeselect}
      onRegenerate={auth.user?.isAdmin ? regenerate : undefined}
    >
      <CAccordion title={title} withDivider defaultExpanded>
        {prescription?.medicines.map((medicine, index) => {
          return (
            <>
              <Typography key={medicine.id} variant='body2' fontWeight={700}>
                {`${index + 1}) ${medicine.name} ${medicine.concentrationDescription}`}
              </Typography>

              <Typography variant='body2'>{medicine.dosageDescription}</Typography>

              <Typography variant='body2' whiteSpace='pre-wrap'>
                {medicine.observation}
              </Typography>
              <br />
            </>
          )
        })}
      </CAccordion>
    </RecordContent>
  )
}
