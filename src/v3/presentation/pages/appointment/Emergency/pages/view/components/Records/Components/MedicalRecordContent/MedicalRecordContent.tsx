import { Typography, Grid, Paper } from '@mui/material'

import { CDialogue, useModalContext } from '@/v3/presentation/components/Modal'
import { useFetchReadMedicalRecord } from '@/v3/presentation/hooks/api/@v2/appointment/medical-record/useFetchReadMedicalRecord'
import { useMutateDeleteMedicalRecord } from '@/v3/presentation/hooks/api/@v2/appointment/medical-record/useMutateDeleteMedicalRecord'
import { CAccordion, CDisplayRecord } from '@/v3/presentation/newComponents'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { useMutateRegenerateMedicalRecord } from '@/v3/presentation/hooks/api/@v2/appointment/medical-record/useMutateRegenerateMedicalRecord'

import { RecordContentProps } from '../../types/TRecords'
import { overflowVisible } from '../../utils/style'
import { Classification } from '../Classification'
import { RecordContent } from '../RecordContent'

export const MedicalRecordContent = ({
  recordId,
  appointmentId,
  canManage,
  viewOverlay,
  onDeselect,
}: RecordContentProps) => {
  const { auth } = useAuth()
  const { medicalrecord } = useFetchReadMedicalRecord({
    medicalRecordId: recordId,
    appointmentId: appointmentId,
  })

  const { handleModal } = useModalContext()
  const invalidateExam = useMutateDeleteMedicalRecord()
  const regenerateExam = useMutateRegenerateMedicalRecord()

  const onInvalidate = async () => {
    await invalidateExam.mutateAsync({
      appointmentId,
      medicalRecordId: recordId,
    })
  }

  const onRegenerate = async () => {
    await regenerateExam.mutateAsync({
      appointmentId,
      medicalRecordId: recordId,
    })
  }

  const invalidate = () => {
    handleModal(
      <CDialogue
        title='Invalidar registro médico'
        confirmButtonLabel='Sim'
        cancelButtonLabel='Não'
        onConfirm={onInvalidate}
        description={
          <>
            Tem certeza que deseja <b>invalidar</b> esse <br /> registro?{' '}
          </>
        }
      />
    )
  }

  const regenerate = () => {
    handleModal(
      <CDialogue
        title='Regenerar registro médico'
        confirmButtonLabel='Sim'
        cancelButtonLabel='Não'
        onConfirm={onRegenerate}
        description={
          <>
            Tem certeza que deseja <b>regenerar</b> esse <br /> registro?{' '}
          </>
        }
      />
    )
  }

  const formatValue = (value?: number) => {
    if (!value || value === 0) {
      return '-'
    }
    return value
  }

  return (
    <RecordContent
      onInvalidate={invalidate}
      title='Registro de atendimento'
      canManage={canManage}
      viewOverlay={viewOverlay}
      record={medicalrecord}
      onClose={onDeselect}
      onRegenerate={auth.user?.isAdmin ? regenerate : undefined}
    >
      {!!medicalrecord && (
        <>
          <Paper
            sx={{
              p: 1,
              ...overflowVisible,
              border: 'solid 2px var(--mui-palette-grey-200)',
              boxShadow: 'none',
            }}
          >
            <Classification classification={medicalrecord.classification} />
          </Paper>

          <CAccordion title='Sinais vitais' withDivider defaultExpanded sx={overflowVisible}>
            <Grid container gap={2}>
              <Grid item md={3} lg={2}>
                <CDisplayRecord
                  label='Pressão arterial (mmHg)'
                  value={medicalrecord.bloodPressure}
                  withDivider={false}
                />
              </Grid>

              <Grid item md={3} lg={2}>
                <CDisplayRecord
                  label='F. cardíaca (bpm)'
                  value={formatValue(medicalrecord.heartRate)}
                  withDivider={false}
                />
              </Grid>

              <Grid item md={3} lg={2}>
                <CDisplayRecord
                  label='F. respiratória (irpm)'
                  value={formatValue(medicalrecord.respiratoryFrequency)}
                  withDivider={false}
                />
              </Grid>

              <Grid item md={3} lg={2}>
                <CDisplayRecord
                  label='Temperatura (ºC)'
                  value={formatValue(medicalrecord.bodyTemperature)}
                  withDivider={false}
                />
              </Grid>

              <Grid item md={3} lg={2}>
                <CDisplayRecord
                  label='Saturação O2'
                  value={formatValue(medicalrecord.oxygenSaturation)}
                  withDivider={false}
                />
              </Grid>
            </Grid>
          </CAccordion>

          <CAccordion title='Relato' withDivider defaultExpanded sx={overflowVisible}>
            <Typography variant='body1' sx={{ whiteSpace: 'pre-wrap' }}>
              {medicalrecord.history}
            </Typography>
          </CAccordion>

          <CAccordion title='Exame' withDivider defaultExpanded sx={overflowVisible}>
            <Typography variant='body1' sx={{ whiteSpace: 'pre-wrap' }}>
              {medicalrecord.exam}
            </Typography>
          </CAccordion>

          <CAccordion title='Impressão' withDivider defaultExpanded sx={overflowVisible}>
            <Typography variant='body1' sx={{ whiteSpace: 'pre-wrap' }}>
              {medicalrecord.impression}
            </Typography>
          </CAccordion>

          <CAccordion title='Conduta' withDivider defaultExpanded sx={overflowVisible}>
            <Typography variant='body1' sx={{ whiteSpace: 'pre-wrap' }}>
              {medicalrecord.conduct}
            </Typography>
          </CAccordion>
          <Typography variant='body1' mb={12} />
        </>
      )}
    </RecordContent>
  )
}
