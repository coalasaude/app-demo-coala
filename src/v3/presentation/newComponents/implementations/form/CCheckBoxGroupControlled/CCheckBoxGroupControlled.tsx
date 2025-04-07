import { Box, FormControl, FormGroup, FormHelperText, FormLabel } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { get } from 'lodash'

import { CFormControlLabel } from '../../../molecules/CFormControlLabel'
import { CCheckbox } from '../../../atoms'

export interface CCheckBoxGroupControlledProps {
  label?: string
  helperText?: string
  options: {
    name: string
    label: string
    value: any
    rules?: any
  }[]
}

export const CCheckBoxGroupControlled = ({
  options,
  label,
  helperText,
}: CCheckBoxGroupControlledProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <FormControl>
      <FormLabel component='legend'>{label}</FormLabel>
      <FormGroup>
        {options.map((option) => (
          <Box key={option.name} ml={1}>
            <Controller
              name={option.name}
              control={control}
              rules={option.rules}
              render={({ field }) => (
                <CFormControlLabel
                  label={option.label}
                  value={option.value}
                  control={
                    <CCheckbox
                      {...field}
                      checked={field.value || false}
                      haveError={!!get(errors, option.name)}
                      onBlur={() => {
                        field.onBlur()
                      }}
                    />
                  }
                />
              )}
            />
          </Box>
        ))}
      </FormGroup>
      <FormHelperText sx={{ opacity: '60%' }}>{helperText}</FormHelperText>
    </FormControl>
  )
}
