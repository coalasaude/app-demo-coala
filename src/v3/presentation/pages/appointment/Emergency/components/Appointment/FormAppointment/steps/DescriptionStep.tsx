import { Grid } from '@mui/material'

import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import DescriptionStepSvg from 'public/assets/svg/AppointmentForm/DescriptionStep.svg'
import { useBreakpoint } from '@/hooks/useBreakpoints'

import { ResumeInputForm } from '../components/ResumeInputForm'

type AppointmentGeneralDataProps = {
  error: any
  disableButton?: boolean
  onEndStep: () => void
  onGoBack: () => void
}

export const DescriptionStep = ({
  error,
  disableButton,
  onEndStep,
  onGoBack,
}: AppointmentGeneralDataProps) => {
  const isSmallDevice = useBreakpoint('md')

  return (
    <Grid container xs={12} md={12} lg={12}>
      {!!isSmallDevice && (
        <Grid item xs={12} display='flex' justifyContent='center' mt={2}>
          <DescriptionStepSvg />
        </Grid>
      )}
      <Grid item xs={12} md={6} lg={8}>
        <CBaseContainer
          buttonDisabled={disableButton}
          buttonLabel='Solicitar'
          boxShadow='none'
          formButtonsProps={{ buttonProps: { sx: { minWidth: 120 }, fullWidth: true } }}
          cancelLabel='Voltar'
          onCancel={() => onGoBack()}
          onConfirm={() => onEndStep()}
          sx={{ py: [0, 4, 4] }}
        >
          <ResumeInputForm error={error} />
        </CBaseContainer>
      </Grid>

      {!isSmallDevice && (
        <Grid item md={6} lg={3} display='flex' alignItems='center' justifyContent='center'>
          <DescriptionStepSvg />
        </Grid>
      )}
    </Grid>
  )
}
