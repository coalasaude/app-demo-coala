import React from 'react'
import { IconButton, InputAdornment, SelectChangeEvent, SelectProps } from '@mui/material'
import { Controller, UseControllerProps, useFormContext } from 'react-hook-form'
import { get } from 'lodash'
import CloseIcon from '@mui/icons-material/Close'

import CSelect from '@/v3/presentation/newComponents/atoms/CSelect'
import { CMenuItemProps } from '@/v3/presentation/newComponents/atoms/CMenuItem/CMenuItem'

import { CSelectProps } from '../../../atoms/CSelect/CSelect'

interface ISelectControlled extends Omit<UseControllerProps<any>, 'control' | 'error'> {
  options?: {
    value: any
    label: string
    itemProps?: CMenuItemProps
  }[]
  nullOptionText?: string
  disabledNullOption?: boolean
  errorMessage?: string
  error?: any
  label?: string
  onChange?: (event: SelectChangeEvent<unknown>) => void
  showClearButton?: boolean
  withoutLabel?: boolean
}

export type ICSelectControlled = ISelectControlled & Omit<SelectProps, 'error'> & CSelectProps

export const CSelectControlled = ({
  name,
  rules,
  error,
  showClearButton = true,
  disabled,
  ...props
}: ICSelectControlled) => {
  const { control, formState, setValue } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => {
        const errorMessage = get(formState?.errors, `${name}.message`) || error
        const value = field.value ?? []

        return (
          <CSelect
            {...field}
            {...props}
            withoutLabel={props?.withoutLabel}
            value={Array.isArray(value) ? value : [value]}
            disabled={disabled}
            onChange={(e) => {
              field.onChange(e)
              props?.onChange?.(e)
            }}
            errorMessage={errorMessage}
            error={!!errorMessage}
            endAdornment={
              field?.value?.length > 0 && showClearButton && !disabled ? (
                <InputAdornment
                  position='end'
                  sx={{ cursor: 'pointer ', mr: 1 }}
                  onClick={() => {
                    setValue(name, [])
                    props?.onChange?.({ target: { value: '', name } } as SelectChangeEvent<unknown>)
                  }}
                >
                  <IconButton>
                    <CloseIcon sx={{ color: 'var(--mui-palette-grey-500)' }} />
                  </IconButton>
                </InputAdornment>
              ) : undefined
            }
          />
        )
      }}
    />
  )
}
