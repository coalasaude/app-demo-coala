import { Box, Button, Typography } from '@mui/material'
import { UseFormReturn } from 'react-hook-form'

import TrashIcon from '/public/assets/svg/TrashIcon.svg'

import { FormResponsibleData } from '@/v3/presentation/pages/users/components/FormResponsible'
import { useFormCheckResponsible } from '@/v3/presentation/pages/users/components/FormResponsible/hooks/useFormCheckResponsible'

export type FormResponsibleStepFieldProps = {
  form: UseFormReturn<any, any>
  handleRemove?: () => void
  handleAdd?: () => void
  prefixName: string
}

export const FormResponsibleStepField = ({
  form,
  handleAdd,
  handleRemove,
  prefixName,
}: FormResponsibleStepFieldProps) => {
  const { disabledEmail, disabledPhone, fetchByEmail, fetchByPhone, onChange } =
    useFormCheckResponsible({ form, prefix: prefixName })

  return (
    <Box>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h3'>Responsável</Typography>

        {handleAdd && (
          <Button
            variant='outlined'
            onClick={() => handleAdd()}
            sx={{ width: 32, minWidth: 32, height: 32 }}
          >
            <Typography fontSize={20}>+</Typography>
          </Button>
        )}
        {handleRemove && (
          <Box sx={{ cursor: 'pointer' }} onClick={() => handleRemove()}>
            <TrashIcon />
          </Box>
        )}
      </Box>

      <Box mt={2} mb={2}>
        <FormResponsibleData
          prefix={prefixName}
          boxProps={{
            mt: 3,
            mb: 2,
          }}
          inputProps={{
            disabledPhone: disabledPhone,
            disabledEmail: disabledEmail,
            disabledName: fetchByEmail || fetchByPhone,
            onChange: onChange,
          }}
        />
      </Box>
    </Box>
  )
}
