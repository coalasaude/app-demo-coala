import { useFormContext } from 'react-hook-form'
import { Stack, Typography } from '@mui/material'

import { MedicineModel } from '@/v3/domain/@v2/health-history/medicine/medicine.model'
import Paper from '@/v3/presentation/components/Paper'
import { GridItem, GridWrapper } from '@/components/Grid'
import useMediaQuery from '@/hooks/useMediaQuery'
import { CDatePickerControlled, CSelectControlled } from '@/components/Forms'
import CSwitchControlled from '@/v3/presentation/newComponents/implementations/form/CSwitchControlled'
import { AuthorizationStatus } from '@/types/medicine'
import { CRadioButtonGroupControlled } from '@/v3/presentation/newComponents'

import { hoursOfTheDay } from './constants'

type Props = {
  medicine: MedicineModel
}

export const AuthorizationCard = ({ medicine }: Props) => {
  const isMobile = useMediaQuery('sm')

  const form = useFormContext()
  const initUsageStatus = form.watch('initUsageStatus')
  const stopUsage = form.watch('stopUsage')
  const disableAuthorizationCard = stopUsage === true
  const disableDateFields = disableAuthorizationCard || !initUsageStatus

  return (
    <Paper
      p={2}
      display='flex'
      flexDirection='column'
      gap={2}
      color={disableAuthorizationCard ? 'var(--mui-palette-grey-400)' : ''}
    >
      <GridWrapper direction='row' alignItems='center'>
        <GridItem xs={12} md={4}>
          <CSwitchControlled
            name='initUsageStatus'
            label='Fazendo uso do medicamento'
            size='small'
            disabled={disableAuthorizationCard}
          />
        </GridItem>
        <GridItem xs={6} md={4}>
          <CDatePickerControlled
            label='Data de início*'
            name='startDate'
            disabled={disableDateFields}
          />
        </GridItem>
        <GridItem xs={6} md={4}>
          <CSelectControlled
            name='startHour'
            value={medicine.startHour || null}
            label='Hora de início*'
            disabledNullOption
            options={hoursOfTheDay.map((hour) => ({
              label: hour,
              value: Number(hour.split(':')[0]),
            }))}
            disabled={disableDateFields}
          />
        </GridItem>
      </GridWrapper>

      <Stack
        direction={isMobile ? 'column' : 'row'}
        alignItems={isMobile ? 'flex-start' : 'center'}
        justifyContent={isMobile ? 'center' : 'flex-start'}
        gap={1}
      >
        <Typography
          variant='h4'
          fontWeight='normal'
          color={disableAuthorizationCard ? 'var(--mui-palette-grey-400)' : ''}
        >
          Autoriza a medicação na escola?*
        </Typography>
        <CRadioButtonGroupControlled
          row
          name='authorizationStatus'
          options={[
            { value: AuthorizationStatus.NOT_AUTHORIZED, label: 'Não' },
            { value: AuthorizationStatus.AUTHORIZED_SCHOOL, label: 'Sim' },
          ]}
          disabled={disableAuthorizationCard}
        />
      </Stack>
    </Paper>
  )
}
