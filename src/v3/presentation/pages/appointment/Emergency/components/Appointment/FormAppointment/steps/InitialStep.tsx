import { Box, Grid, Stack, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useEffect } from 'react'
import { ArrowRightIcon } from '@mui/x-date-pickers'

import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { CCheckBoxControlled } from '@/v3/presentation/newComponents'
import { InstitutionAppointmentSelectInputForm } from '@/v3/presentation/newComponents/implementations/form/InstitutionSelectAppointmentInput'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import InitialStepSvg from 'public/assets/svg/AppointmentForm/InitialStep.svg'
import { useBreakpoint } from '@/hooks/useBreakpoints'
import { target } from '@/v3/presentation/newComponents/atoms/CJoyride/constants/target'

import { PatientSelectInputForm } from '../components/PatientSelectInput'
import { RequesterSelectInputForm } from '../components'
import { IFormEditAppointment } from '../schema/edit-schema'

type AppointmentGeneralDataProps = {
  disableButton?: boolean
  onNextStep: () => void
}

export const InitialStep = ({ disableButton, onNextStep }: AppointmentGeneralDataProps) => {
  const { auth } = useAuth()
  const isSmallDevice = useBreakpoint('md')
  const isAdmin = Boolean(auth.user?.isAdmin)
  const { watch, setValue, trigger, clearErrors } = useFormContext<IFormEditAppointment>()
  const [patientId, hasNoPatient, institutionId] = watch([
    'patientId',
    'hasNoPatient',
    'institutionId',
  ])

  async function onSubmit() {
    const isValid = await trigger(['institutionId', 'patientId', 'requestedUserId'])
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
  }, [patientId, hasNoPatient, institutionId])

  useEffect(() => {
    if (hasNoPatient) {
      setValue('patientId', null)
    }
  }, [hasNoPatient, setValue])

  const disabledPatient = !institutionId || hasNoPatient
  const disabledRequestedUser = !institutionId

  return (
    <Grid container xs={12} md={12} lg={12}>
      {!!isSmallDevice && (
        <Grid item xs={12} display='flex' justifyContent='center' mt={2}>
          <InitialStepSvg />
        </Grid>
      )}
      <Grid item xs={12} md={6} lg={8.1}>
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
            <div id={target.coalaInitialStep}>
              <Typography variant='h4' mb={1}>
                Para qual instituição será este atendimento?*
              </Typography>

              <InstitutionAppointmentSelectInputForm
                name='institutionId'
                placeholder='Selecione a instituição'
                data-testid='searchInstitutionField'
                sx={{ mb: 0 }}
              />
            </div>

            <div id={target.coalaInitialStepSecond}>
              <PatientSelectInputForm
                title='Pra quem é o atendimento?*'
                disabled={!!disabledPatient}
                sx={{ mb: 0 }}
              />

              <Box mb={patientId ? 4 : 0}>
                {!patientId && (
                  <CCheckBoxControlled
                    name='hasNoPatient'
                    disabled={!institutionId}
                    values={{
                      value: true,
                      label: 'Não achei o paciente',
                    }}
                    sx={{ ml: 2 }}
                  />
                )}
              </Box>
            </div>

            <div>
              {isAdmin && (
                <RequesterSelectInputForm
                  title='Quem é o solicitante do atendimento?*'
                  disabled={disabledRequestedUser}
                  sx={{ mb: 0 }}
                />
              )}
            </div>
          </Stack>
        </CBaseContainer>
      </Grid>

      {!isSmallDevice && (
        <Grid item md={6} lg={3.9} display='flex' alignItems='center' justifyContent='center'>
          <InitialStepSvg />
        </Grid>
      )}
    </Grid>
  )
}
