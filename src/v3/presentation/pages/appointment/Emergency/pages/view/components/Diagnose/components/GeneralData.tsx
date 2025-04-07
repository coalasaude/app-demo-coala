import { Box } from '@mui/material'
import dayjs from 'dayjs'
import { Dispatch, SetStateAction } from 'react'

import { CDisplayRecord, CDivider } from '@/v3/presentation/newComponents'
import { GridWrapper, GridItem } from '@/components/Grid'
import { TApiAppointmentDiagnoseResponse } from '@/v3/domain/diagnose'
import { cidTypeDescription } from '@/constants/cid'

import InvalidateCidDialog from '../../Modal/InvalidateCidDialog'

import FooterButtons from './FooterButtons'

export const GeneralData = ({
  data,
  getDiagnose,
  setShowRemoveModal,
  showRemoveModal,
}: {
  data?: TApiAppointmentDiagnoseResponse
  setShowRemoveModal: Dispatch<SetStateAction<boolean>>
  showRemoveModal: boolean
  getDiagnose: () => Promise<null | undefined>
}) => {
  const appointmentId = data?.appointment_id ? data.appointment_id : 0
  const diagnoseId = data?.id ? data.id : 0
  return (
    <Box py={2}>
      <GridWrapper>
        <GridItem xs={12} md={6}>
          <Box ml={2}>
            <CDisplayRecord label='CID' value={data?.cid?.code_description} />
          </Box>
        </GridItem>
        <GridItem xs={12} md={6}>
          <CDisplayRecord
            label='Diagnóstico externo'
            value={!!data?.diagnoseExternal ? 'Sim' : 'Não'}
          />
        </GridItem>
        <GridItem xs={12} md={6}>
          <Box ml={2}>
            <CDisplayRecord
              label='Tipo'
              value={cidTypeDescription[data?.type || 'Não informado']}
            />
          </Box>
        </GridItem>
        <GridItem xs={12} md={6}>
          <CDisplayRecord label='Data' value={dayjs(data?.date).format('DD/MM/YYYY')} />
        </GridItem>
        <GridItem xs={12} md={6}>
          <Box ml={2}>
            <CDisplayRecord label='Desfecho' value={data?.description || 'Não informado'} />
          </Box>
        </GridItem>
      </GridWrapper>
      <CDivider sx={{ borderBottomWidth: 2, paddingTop: 4, marginLeft: 2 }} />
      <FooterButtons onClick={() => setShowRemoveModal(true)} />
      {!!showRemoveModal && (
        <InvalidateCidDialog
          open={showRemoveModal}
          onClose={() => setShowRemoveModal(!showRemoveModal)}
          onSuccess={getDiagnose}
          appointmentId={appointmentId}
          id={diagnoseId}
        />
      )}
    </Box>
  )
}

export default GeneralData
