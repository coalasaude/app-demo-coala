import { Box, Divider, Typography } from '@mui/material'
import { get } from 'lodash'

import { CSelectControlled } from '@/components/Forms'
import { maxLength } from '@/components/Forms/normalizers/maxLengthNormalizer'
import { onlyNumsNormalizer } from '@/components/Forms/normalizers/onlyNumsNormalizer'
import { GridItem, GridWrapper } from '@/components/Grid'
import DiagnoseForm from '@/containers/Appointment/Emergency/cid/add/components/DiagnoseForm'
import { MedicalRecordClassification } from '@/types/medicalRecord'
import { FormButtons } from '@/v3/presentation/components/FormButtons'
import { CInputControlled, CTextAreaControlled } from '@/v3/presentation/newComponents'

import ButtonWrapperVideoCall from '../../../../../call/components/ButtonWrapperVideoCall'
import { WrapperButtonsForm } from '../../../AddRecord/components/WrapperButtonsForm'
import { MedicalRecordFormProps } from '../types'

export const MedicalRecordForm = ({
  error,
  isScheduled = false,
  onSubmit,
  handleSubmitError,
  isSmallDevice,
  isAppointmentResume,
  isMedical,
  withDivider,
  onCancel,
  diagnoseExternal,
}: MedicalRecordFormProps) => {
  const Wrapper = isAppointmentResume ? ButtonWrapperVideoCall : WrapperButtonsForm

  return (
    <Box mt={4}>
      <GridWrapper>
        {!isScheduled && (
          <>
            <GridWrapper>
              <GridItem ml={2} xs={12} lg={isAppointmentResume ? 12 : 6}>
                <CSelectControlled
                  disabledNullOption
                  placeholder='Classificação de risco'
                  name='classification'
                  options={[
                    {
                      value: MedicalRecordClassification.NOT_URGENT,
                      label: 'Não urgente',
                    },
                    {
                      value: MedicalRecordClassification.LOW_URGENT,
                      label: 'Pouco urgente',
                    },
                    {
                      value: MedicalRecordClassification.URGENT,
                      label: 'Urgente',
                    },
                    {
                      value: MedicalRecordClassification.VERY_URGENT,
                      label: 'Muito urgente',
                    },
                    {
                      value: MedicalRecordClassification.EMERGENCY,
                      label: 'Emergência',
                    },
                  ]}
                />
              </GridItem>
            </GridWrapper>

            <GridItem xs={12}>
              <Typography variant='h4'>Sinais vitais</Typography>
            </GridItem>
            <GridItem xs={6}>
              <CInputControlled
                name='systolic'
                variant='outlined'
                label='Sistólica (mmHg)'
                placeholder='Pressão sistólica (mmHg)'
                error={get(error, 'data.systolic')}
                transform={{
                  input: [onlyNumsNormalizer, maxLength(3)],
                }}
              />
            </GridItem>
            <GridItem xs={6}>
              <CInputControlled
                name='diastolic'
                placeholder='Pressão diastólica (mmHg)'
                variant='outlined'
                label='Diastólica (mmHg)'
                error={get(error, 'data.diastolic')}
                transform={{
                  input: [onlyNumsNormalizer, maxLength(3)],
                }}
              />
            </GridItem>
            <GridItem xs={6}>
              <CInputControlled
                name='heart_rate'
                placeholder='Frequência cardíaca (bpm)'
                variant='outlined'
                label='Frequência cardíaca (bpm)'
                error={get(error, 'data.heart_rate')}
                transform={{
                  input: [onlyNumsNormalizer, maxLength(3)],
                }}
              />
            </GridItem>
            <GridItem xs={6}>
              <CInputControlled
                name='respiratory_frequency'
                variant='outlined'
                placeholder='Frequência respiratória (irpm)'
                label='Frequência respiratória (irpm)'
                error={get(error, 'data.respiratory_frequency')}
                transform={{
                  input: [onlyNumsNormalizer, maxLength(3)],
                }}
              />
            </GridItem>
            <GridItem xs={6}>
              <CInputControlled
                placeholder='Temperatura (ºC)'
                name='body_temperature'
                variant='outlined'
                label='Temperatura (ºC)'
                error={get(error, 'data.body_temperature')}
                currencyInputProps={{
                  prefix: '',
                  decimalSeparator: ',',
                  maxLength: 5,
                  decimalScale: 1,
                  min: 0.01,
                }}
                inputType='currency'
              />
            </GridItem>
            <GridItem xs={6}>
              <CInputControlled
                name='oxygen_saturation'
                placeholder='Saturação O2 (%)'
                variant='outlined'
                label='Saturação O2'
                error={get(error, 'data.oxygen_saturation')}
                transform={{
                  input: [onlyNumsNormalizer, maxLength(3)],
                }}
              />
            </GridItem>
          </>
        )}
        <GridItem xs={12}>
          <Typography my={2} variant='h4'>
            Relato
          </Typography>

          <CTextAreaControlled
            name='history'
            rows={10}
            variant='outlined'
            label='Relato'
            placeholder='Digite o relato'
          />
        </GridItem>
        {!isScheduled && (
          <GridItem xs={12}>
            <Typography my={2} variant='h4'>
              Exame
            </Typography>

            <CTextAreaControlled
              name='exam'
              rows={7}
              variant='outlined'
              label='Exame'
              placeholder='Digite o exame'
            />
          </GridItem>
        )}
        <GridItem xs={12}>
          <Typography my={2} variant='h4'>
            Impressão
          </Typography>
          <CTextAreaControlled
            name='impression'
            rows={3}
            variant='outlined'
            placeholder='Digite a impressão'
            label='Impressão'
          />
        </GridItem>

        {isMedical && (
          <Box m={2} mt={4} width='100%'>
            <DiagnoseForm diagnoseExternal={!!diagnoseExternal} prefix='diagnose.' />
          </Box>
        )}

        <GridItem xs={12} mb={isAppointmentResume ? 14 : 0}>
          <Typography mb={2} variant='h4'>
            Conduta
          </Typography>
          <CTextAreaControlled
            name='conduct'
            variant='outlined'
            rows={11}
            label='Conduta'
            placeholder='Digite a conduta'
          />
        </GridItem>
      </GridWrapper>
      {withDivider && <Divider sx={{ my: 2 }} />}
      <Wrapper>
        <FormButtons
          display='flex'
          mt={[0, 2]}
          justifyContent='flex-end'
          confirmLabel='Registrar'
          cancelLabel={isSmallDevice ? 'Cancelar' : 'Limpar'}
          onConfirm={() => {
            handleSubmitError()
            onSubmit()
          }}
          onCancel={onCancel}
          minWidth={['100%', 100]}
          cancelVariant='text'
        />
      </Wrapper>
    </Box>
  )
}

export default MedicalRecordForm
