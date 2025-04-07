import dayjs from 'dayjs'

import { GridItem, GridWrapper } from '@/components/Grid'
import { cidTypeDescription } from '@/constants/cid'
import { CDialogue, useModalContext } from '@/v3/presentation/components/Modal'
import { useFetchReadDiagnose } from '@/v3/presentation/hooks/api/@v2/appointment/diagnose/useFetchReadDiagnose'
import { useMutateDeleteDiagnose } from '@/v3/presentation/hooks/api/@v2/appointment/diagnose/useMutateDeleteDiagnose'
import { CAccordion, CDisplayRecord } from '@/v3/presentation/newComponents'

import { RecordContentProps } from '../../types/TRecords'
import { RecordContent } from '../RecordContent'

export const Diagnose = ({
  recordId,
  appointmentId,
  canManage,
  viewOverlay,
  onDeselect,
}: RecordContentProps) => {
  const { diagnose } = useFetchReadDiagnose({ diagnoseId: recordId, appointmentId: appointmentId })
  const { handleModal } = useModalContext()
  const invalidateDiagnose = useMutateDeleteDiagnose()
  const cidDescription = diagnose?.cid.category
    ? `${diagnose?.cid?.category} - ${diagnose?.cid?.name}`
    : diagnose?.cid?.name

  const onInvalidate = async () => {
    await invalidateDiagnose.mutateAsync({
      appointmentId,
      diagnoseId: recordId,
    })
  }

  const invalidate = () => {
    handleModal(
      <CDialogue
        title='Invalidar diagnóstico'
        confirmButtonLabel='Sim'
        cancelButtonLabel='Não'
        onConfirm={onInvalidate}
        description={
          <>
            Tem certeza que deseja <b>invalidar</b> esse <br /> diagnóstico?{' '}
          </>
        }
      />,
    )
  }

  return (
    <RecordContent
      onInvalidate={invalidate}
      title='Registro de diagnóstico'
      canManage={canManage}
      viewOverlay={viewOverlay}
      record={diagnose}
      onClose={onDeselect}
      allowDownload={false}
    >
      {!!diagnose && (
        <CAccordion title={'Diagnóstico'} withDivider defaultExpanded>
          <GridWrapper>
            <GridItem xs={12} md={12}>
              <CDisplayRecord label='CID' value={cidDescription} />
            </GridItem>
            <GridItem xs={6} md={4}>
              <CDisplayRecord
                label='Diagnóstico externo'
                value={!!diagnose.diagnoseExternal ? 'Sim' : 'Não'}
              />
            </GridItem>
            <GridItem xs={6} md={4}>
              <CDisplayRecord
                label='Tipo'
                value={cidTypeDescription[diagnose.type || 'Não informado']}
              />
            </GridItem>
            <GridItem xs={4} md={4}>
              <CDisplayRecord label='Data' value={dayjs(diagnose.date).format('DD/MM/YYYY')} />
            </GridItem>
            {diagnose?.observation && (
              <GridItem xs={12} md={12}>
                <CDisplayRecord label='Observação' value={diagnose.observation} />
              </GridItem>
            )}
          </GridWrapper>
        </CAccordion>
      )}
    </RecordContent>
  )
}
