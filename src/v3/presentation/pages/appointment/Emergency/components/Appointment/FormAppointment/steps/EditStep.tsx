import { Grid, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { InstitutionSelectInputForm } from '@/v3/presentation/newComponents/implementations/form/InstitutionSelectInput/InstitutionSelectInputForm'
import InitialStepSvg from 'public/assets/svg/AppointmentForm/InitialStep.svg'
import { useBreakpoint } from '@/hooks/useBreakpoints'

import { PatientSelectInputForm } from '../components/PatientSelectInput'
import { RequesterSelectInputForm } from '../components'
import { IFormEditAppointment } from '../schema/edit-schema'

type AppointmentGeneralDataProps = {
  disableButton?: boolean
  onNextStep: () => void
}

export const EditStep = ({ disableButton, onNextStep }: AppointmentGeneralDataProps) => {
  const isSmallDevice = useBreakpoint('sm')
  const { trigger } = useFormContext<IFormEditAppointment>()

  async function onSubmit() {
    const isValid = await trigger(['institutionId', 'patientId', 'requestedUserId'])
    if (!isValid) return

    onNextStep()
  }

  return (
    <Grid container xs={12} md={12} lg={12}>
      {!!isSmallDevice && (
        <Grid item xs={12} md={5} lg={5} display='flex' justifyContent='center' mt={2}>
          <InitialStepSvg />
        </Grid>
      )}
      <Grid item xs={12} md={7} lg={7}>
        <CBaseContainer
          buttonDisabled={disableButton}
          buttonLabel='Atualizar'
          boxShadow='none'
          formButtonsProps={{ buttonProps: { sx: { minWidth: 120 }, fullWidth: true } }}
          onConfirm={onSubmit}
          sx={{ py: [0, 4, 4], pl: [0, 6, 8] }}
        >
          <Typography variant='h4' mb={1}>
            Para qual instituição será este atendimento?*
          </Typography>

          <InstitutionSelectInputForm
            name='institutionId'
            placeholder='Selecione a instituição'
            disabled
            data-testid='searchInstitutionField'
            sx={{ mb: 2 }}
          />

          <PatientSelectInputForm
            title='Pra quem é o atendimento?*'
            disabled={false}
            sx={{ mt: 1 }}
          />

          <RequesterSelectInputForm
            title='Quem é o solicitante do atendimento?*'
            disabled
            sx={{ mt: 1 }}
          />
        </CBaseContainer>
      </Grid>

      {!isSmallDevice && (
        <Grid item md={4} lg={4} display='flex' alignItems='center' justifyContent='center'>
          <InitialStepSvg />
        </Grid>
      )}
    </Grid>
  )
}
