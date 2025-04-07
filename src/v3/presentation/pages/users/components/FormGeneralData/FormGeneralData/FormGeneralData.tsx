import { Grid } from '@mui/material'
import dayjs from 'dayjs'

import { CAutoComplete, CDatePickerControlled } from '@/components/Forms'
import { GenreOptions } from '@/constants/genre'
import { BloodTypeOptions } from '@/constants/blood'

export const FormGeneralData = () => {
  return (
    <Grid container spacing={2} mt={2}>
      <Grid item xs={6} sm={6} md={4}>
        <CDatePickerControlled name='birthDate' label='Data de nascimento*' maxDate={dayjs()} />
      </Grid>
      <Grid item xs={6} sm={6} md={4}>
        <CAutoComplete
          name='bloodType'
          options={BloodTypeOptions}
          label='Tipo sanguíneo'
          placeholder='Tipo sanguíneo'
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <CAutoComplete name='genre' options={GenreOptions} label='Gênero*' placeholder='Gênero*' />
      </Grid>
    </Grid>
  )
}
