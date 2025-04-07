import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  RadioGroupProps,
  SxProps,
  Theme,
} from '@mui/material'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'
import { FC } from 'react'

import { CRadioButton } from '../../atoms/CRadioButton'
import { CFormControlLabel } from '../CFormControlLabel'
import { CRadioGroup } from '../CRadioGroup'

export interface IRadioButtonGroupProps extends RadioGroupProps {
  name: string
  label?: string
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom'
  disabled?: boolean
  error?: string
  field?: ControllerRenderProps<FieldValues, string>
  options: {
    value: string | boolean
    label: string
    labelStyle?: SxProps<Theme>
    radioStyle?: SxProps<Theme>
  }[]
}

export const CRadioButtonGroup: FC<IRadioButtonGroupProps> = ({
  name,
  label,
  options,
  labelPlacement,
  disabled,
  field,
  error: errorMessage,
  ...props
}) => {
  return (
    <FormControl error={!!errorMessage}>
      {label && <FormLabel id={name}>{label}</FormLabel>}
      <CRadioGroup value={field?.value} {...props}>
        {options.map((option) => (
          <Box
            key={String(option.value)}
            marginLeft={labelPlacement === 'end' || !labelPlacement ? 1 : 0}
          >
            <CFormControlLabel
              sx={option?.labelStyle}
              labelPlacement={labelPlacement || 'end'}
              control={<CRadioButton {...field} {...option} disabled={disabled} />}
              label={option.label}
            />
          </Box>
        ))}
      </CRadioGroup>
      {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
    </FormControl>
  )
}
