import { Box, Typography } from '@mui/material'
import { get } from 'lodash'
import { useFormContext } from 'react-hook-form'

import { CBaseContainer, CRadioButtonGroupControlled } from '@/v3/presentation/newComponents'
import { ComplaintSelectInputForm } from '@/v3/presentation/newComponents/implementations/form/ComplaintSelectInput/ComplaintSelectInputForm'

export const ComplaintInputForm = ({ error }: { error?: string }) => {
  const { watch } = useFormContext()
  const [isAccident] = watch(['isAccident'])

  return (
    <>
      <CBaseContainer mt={1} sx={{ backgroundColor: 'var(--mui-palette-grey-100)' }}>
        <Typography variant='body1'>Foi um acidente dentro da instituição?*</Typography>
        <CRadioButtonGroupControlled
          name='isAccident'
          options={[
            { label: 'Sim', value: true },
            { label: 'Não', value: false },
          ]}
          row
          data-testid='isClinicalBtnGroup'
        />
      </CBaseContainer>

      <Box mt={1} mb={1}>
        <Typography variant='h4'>Qual o tipo da queixa?*</Typography>
      </Box>
      <Box mt={2}>
        <ComplaintSelectInputForm
          name='complaintId'
          label='Selecione o tipo de queixa'
          error={get(error, 'data.complaintId')}
          data-testid='complaintField'
          disabled={isAccident === undefined}
        />
      </Box>
    </>
  )
}
