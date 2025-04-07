import { Box, Grid, Stack, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useEffect } from 'react'
import { ArrowRightIcon } from '@mui/x-date-pickers'

import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { InstitutionAppointmentSelectInputForm } from '@/v3/presentation/newComponents/implementations/form/InstitutionSelectAppointmentInput'
import RetroactiveAppointmentSvg from 'public/assets/svg/RetroactiveAppointment.svg'
import { target } from '@/v3/presentation/newComponents/atoms/CJoyride/constants/target'
import { maxLength } from '@/components/Forms/normalizers/maxLengthNormalizer'
import { CInputControlled } from '@/v3/presentation/newComponents'
import { CFileInputControlled } from '@/v3/presentation/newComponents/implementations/form/CFileInputControlled'

import { PatientSelectInputForm, RequesterSelectInputForm } from '../../FormAppointment/components'
import { IFormAddRetroactiveAppointment } from '../schema/add-retroactive-schema'

type AppointmentGeneralDataProps = {
  disableButton?: boolean
  onNextStep: () => void
}

const characterLimit = 70

export const InitialStep = ({ disableButton, onNextStep }: AppointmentGeneralDataProps) => {
  const { watch, setValue, trigger, clearErrors } = useFormContext<IFormAddRetroactiveAppointment>()
  const [resume, patientId, institutionId] = watch(['resume', 'patientId', 'institutionId'])

  async function onSubmit() {
    const isValid = await trigger(['institutionId', 'patientId', 'requestedUserId', 'resume'])
    if (!isValid) return

    onNextStep()
  }

  useEffect(() => {
    if (!institutionId) {
      setValue('patientId', null)
      setValue('requestedUserId', null)
    }
  }, [institutionId, setValue])

  useEffect(() => {
    clearErrors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId, institutionId])

  const disabledPatient = !institutionId
  const disabledRequestedUser = !institutionId

  return (
    <Grid container xs={12} md={12} lg={12}>
      <Grid item xs={12} display={{ xs: 'flex', md: 'none' }} justifyContent='center' mt={2}>
        <RetroactiveAppointmentSvg style={{ width: '100%' }} />
      </Grid>

      <Grid item xs={12} md={6} lg={8}>
        <CBaseContainer
          buttonDisabled={disableButton}
          buttonLabel='Próximo'
          boxShadow='none'
          formButtonsProps={{ buttonProps: { sx: { minWidth: 120 }, fullWidth: true } }}
          endIcon={<ArrowRightIcon />}
          onConfirm={onSubmit}
          sx={{ py: [0, 4, 4] }}
        >
          <Stack spacing={4}>
            <div>
              <Typography variant='h4'>Para qual instituição foi este atendimento?*</Typography>
              <InstitutionAppointmentSelectInputForm
                name='institutionId'
                placeholder='Selecione a instituição'
                data-testid='searchInstitutionField'
                sx={{ mb: 0 }}
              />
            </div>

            <div>
              <PatientSelectInputForm
                title='Pra quem foi o atendimento?*'
                disabled={!!disabledPatient}
                sx={{ mb: 0 }}
              />
            </div>

            <div>
              <RequesterSelectInputForm
                title='Quem é que solicitou o atendimento?*'
                disabled={disabledRequestedUser}
                sx={{ mb: 0 }}
              />
            </div>

            <div>
              <Box mb={1}>
                <Typography variant='h4'>O que aconteceu?*</Typography>
                <Typography variant='caption'>
                  Descreva abaixo o que está acontecendo, os sintomas, queixas ou dúvidas. <br />
                  Lembre-se que essa descrição ficará no registro de atendimento do paciente
                </Typography>
              </Box>

              <CInputControlled
                name='resume'
                maxLength={characterLimit}
                placeholder='Conte o motivo da queixa'
                label='O que aconteceu?*'
                size='medium'
                fullWidth
                helperText={`${resume?.length || 0}/${characterLimit}`}
                transform={{
                  input: [maxLength(characterLimit)],
                  output: [maxLength(characterLimit)],
                }}
              />
            </div>

            <div id={target.coalaResumeInputFormSecond}>
              <Box mb={1}>
                <Typography variant='h4'>Você tem alguma imagem para incluir?</Typography>
                <Typography variant='caption'>
                  A imagem agiliza muito o atendimento e enriquece os dados.
                </Typography>
              </Box>

              <CFileInputControlled
                placeholder='Selecione uma imagem'
                accept='.jpeg,.jpg,.png,.jpe,.bmp,.pdf'
                name='file'
                label='Selecione uma imagem'
              />
            </div>
          </Stack>
        </CBaseContainer>
      </Grid>

      <Grid
        item
        md={6}
        lg={4}
        display={{ xs: 'none', md: 'flex' }}
        alignItems='center'
        justifyContent='center'
      >
        <RetroactiveAppointmentSvg />
      </Grid>
    </Grid>
  )
}
