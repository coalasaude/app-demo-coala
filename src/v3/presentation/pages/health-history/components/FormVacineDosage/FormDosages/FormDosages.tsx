import { Grid } from '@mui/material'

import { maxValue } from '@/components/Forms/normalizers/maxValue'
import { onlyNumsNormalizer } from '@/components/Forms/normalizers/onlyNumsNormalizer'
import { spacing } from '@/utils/spacing'
import { CAccordionBody, CInputControlled } from '@/v3/presentation/newComponents'

import FormDosage from '../FormDosage'

export const FormDosages = ({
  prefix,
  secondaryButton,
  index,
  existentVaccine,
}: {
  prefix: string
  index: number
  secondaryButton?: React.ReactNode
  existentVaccine?: { dosesDate: Date[]; reinforcementDates: Date[] }
}) => {
  return (
    <CAccordionBody secondaryButton={secondaryButton}>
      <Grid container spacing={2} padding={'16px 0px 0px'}>
        <Grid item xs={6} md={2}>
          <CInputControlled
            label='Doses'
            placeholder='Digite a quantidade de doses'
            name={prefix + 'dosages'}
            transform={{
              input: [onlyNumsNormalizer],
              output: [maxValue(15) || ''],
            }}
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <CInputControlled
            placeholder='Digite a quantidade de reforços'
            label='Reforços'
            name={prefix + 'reinforcements'}
            transform={{
              input: [onlyNumsNormalizer],
              output: [maxValue(15) || ''],
            }}
          />
        </Grid>
      </Grid>
      <Grid container padding={'16px 0px'}>
        <Grid item xs={12} md={6} spacing={2} pr={[0, 0, spacing(3)]}>
          <FormDosage
            getLabel={(index) => `${index + 1}º Dose`}
            watchName={prefix + 'dosages'}
            name={prefix + 'dosageDates'}
            label='Data da dose*'
            index={index}
            existentDoses={existentVaccine?.dosesDate}
          />
        </Grid>
        <Grid item xs={12} md={6} spacing={2} pl={[0, 0, spacing(3)]}>
          <FormDosage
            getLabel={(index) => `${index + 1}º Reforço`}
            label='Data do reforço*'
            watchName={prefix + 'reinforcements'}
            name={prefix + 'reinforcementDates'}
            index={index}
            existentDoses={existentVaccine?.reinforcementDates}
          />
        </Grid>
      </Grid>
    </CAccordionBody>
  )
}
