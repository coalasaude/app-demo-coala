import { Grid, Stack, Typography } from '@mui/material'
import { get } from 'lodash'

import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import DescriptionStepSvg from 'public/assets/svg/RetroactiveDescriptionStep.svg'
import Paper from '@/v3/presentation/components/Paper'
import CTimePickerControlled from '@/v3/presentation/newComponents/implementations/form/CTimePickerControlled'
import CDatePickerControlled from '@/v3/presentation/newComponents/implementations/form/CDatePickerControlled'

import { StatusInputForm } from '../components/StatusInputForm'
import { HealthUserSelectInputForm } from '../components'

type AppointmentGeneralDataProps = {
  disableButton?: boolean
  error: any
  onEndStep: () => void
  onGoBack: () => void
}

export const DescriptionStep = ({
  error,
  disableButton,
  onEndStep,
  onGoBack,
}: AppointmentGeneralDataProps) => {
  return (
    <Grid container xs={12} md={12} lg={12}>
      <Grid item xs={12} display={{ xs: 'flex', md: 'none' }} justifyContent='center' mt={2}>
        <DescriptionStepSvg style={{ width: '100%' }} />
      </Grid>

      <Grid item xs={12} md={6} lg={8}>
        <CBaseContainer
          buttonDisabled={disableButton}
          buttonLabel='Registrar atendimento'
          boxShadow='none'
          formButtonsProps={{ buttonProps: { sx: { minWidth: 200 }, fullWidth: true } }}
          cancelLabel='Voltar'
          onCancel={() => onGoBack()}
          onConfirm={() => onEndStep()}
          sx={{ py: [0, 4, 4] }}
        >
          <Paper p={4}>
            <Typography variant='h2'>Data e horários do atendimento</Typography>

            <Stack spacing={4} mt={4}>
              <div>
                <Typography variant='h4' mb={1}>
                  Solicitação*
                </Typography>

                <Stack direction='row' spacing={2}>
                  <CDatePickerControlled
                    name='createdAtDate'
                    error={get(error, 'data.createdAtDate')}
                  />
                  <CTimePickerControlled
                    name='createdAtTime'
                    error={get(error, 'data.createdAtTime')}
                  />
                </Stack>
              </div>

              <div>
                <Typography variant='h4' mb={1}>
                  Abertura*
                </Typography>

                <Stack direction='row' spacing={2}>
                  <CDatePickerControlled
                    name='openedAtDate'
                    error={get(error, 'data.openedAtDate')}
                  />
                  <CTimePickerControlled
                    name='openedAtTime'
                    error={get(error, 'data.openedAtTime')}
                  />
                </Stack>
              </div>

              <div>
                <Typography variant='h4' mb={1}>
                  Encerramento*
                </Typography>

                <Stack direction='row' spacing={2}>
                  <CDatePickerControlled name='openedAtDate' disabled />
                  <CTimePickerControlled
                    name='closedAtTime'
                    error={get(error, 'data.closedAtTime')}
                  />
                </Stack>
              </div>
            </Stack>
          </Paper>

          <Stack spacing={4} mt={4}>
            <div>
              <HealthUserSelectInputForm title='Qual o nome do profissional de saúde que abriu o atendimento?*' />
            </div>

            <div>
              <StatusInputForm />
            </div>
          </Stack>
        </CBaseContainer>
      </Grid>

      <Grid
        item
        md={6}
        lg={3}
        display={{ xs: 'none', md: 'flex' }}
        alignItems='center'
        justifyContent='center'
      >
        <DescriptionStepSvg />
      </Grid>
    </Grid>
  )
}
