import { Box } from '@mui/material'
import { useRouter } from 'next/router'

import { CDisplayRecord, CDivider } from '@/v3/presentation/newComponents'
import { GridWrapper, GridItem } from '@/components/Grid'
import { Appointment, AppointmentStatus } from '@/v3/domain/Appointment'
import { ComplaintDescription } from '@/constants/complaint'
import { MEDICAL_RECORD_CLASSIFICATION_DESCRIPTION } from '@/constants/medicalRecordClassification'
import { AppointmentStatusDescription } from '@/constants/status'
import { formatDate } from '@/utils/formatDate'
import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'

import FooterButtons from '../FooterButtons'

import GeneralTitle from './GeneralTitle'
import AppointmentQueueChange from './AppointmentQueue'

export const GeneralData = ({
  data,
  onSubmit,
}: {
  data?: Appointment
  onSubmit: (body: any) => Promise<void>
}) => {
  const router = useRouter()
  const professionalsInvolved = () => {
    if (!data?.medicalRecords[0]?.professional || data.medicalRecords.length === 0) {
      return 'Nenhum profissional envolvido'
    }
    return data.medicalRecords
      .map(({ professional }) => `${professional?.name} ${professional?.lastname}`)
      .join(' / ')
  }
  const classification = data?.medicalRecords[0]?.classification
    ? MEDICAL_RECORD_CLASSIFICATION_DESCRIPTION[data.medicalRecords[0]?.classification]
    : 'Sem classificação'
  const absenceCare = data?.sickNote
    ? formatDate(String(data?.sickNote[0]?.validUntil))
    : 'Não teve afastamento'

  return (
    <>
      <GeneralTitle isFinished={data?.status === AppointmentStatus.FINISHED} />
      <GridWrapper>
        <GridItem xs={12} md={6}>
          <Box ml={2}>
            <CDisplayRecord
              label='Tipo de queixa'
              value={ComplaintDescription[data?.complaint || ''] || '-'}
            />
          </Box>
        </GridItem>
      </GridWrapper>
      <Box mt={2} />
      <GridWrapper>
        <GridItem xs={12} md={6}>
          <Box ml={2}>
            <CDisplayRecord label='Classificação de risco' value={classification} />
          </Box>
        </GridItem>
      </GridWrapper>
      <Box mt={2} />
      <GridWrapper>
        <GridItem xs={12}>
          <Box ml={2}>
            <CDisplayRecord label='Descrição da queixa' value={data?.resume} />
          </Box>
        </GridItem>
        <GridItem xs={12} md={6}>
          <Box ml={2}>
            <CDisplayRecord
              label='Desfecho'
              value={
                data?.status === AppointmentStatus.FINISHED ||
                data?.status === AppointmentStatus.FINISHED_REMOVAL
                  ? AppointmentStatusDescription[data?.status]
                  : 'Não finalizado'
              }
            />
          </Box>
        </GridItem>
        <GridItem xs={12} md={6}>
          <CDisplayRecord label='Profissionais envolvidos' value={professionalsInvolved()} />
        </GridItem>
        <GridItem xs={12} md={6}>
          <Box ml={2}>
            <CDisplayRecord label='Afastamento' value={!!data?.sickNote ? 'Sim' : 'Não'} />
          </Box>
        </GridItem>
        <GridItem xs={12} md={6}>
          <CDisplayRecord label='Data final do afastamento' value={absenceCare} />
        </GridItem>
        <AppointmentQueueChange data={data} onSubmit={onSubmit} />
      </GridWrapper>
      <CDivider sx={{ borderBottomWidth: 1, paddingTop: 4, marginLeft: 2 }} />
      <FooterButtons
        title={data?.status === AppointmentStatus.FINISHED ? 'Editar ticket' : ''}
        onClick={() =>
          router.push(
            bindPathParams(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.FINISHED.path, {
              id: String(data?.id || router.query.id),
            }),
          )
        }
      />
    </>
  )
}

export default GeneralData
