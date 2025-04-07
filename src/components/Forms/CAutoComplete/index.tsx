import {
  Autocomplete,
  AutocompleteProps,
  CircularProgress,
  InputAdornment,
  TextFieldProps,
} from '@mui/material'
import React from 'react'
import { get } from 'lodash'
import { Controller, UseControllerProps, useFormContext } from 'react-hook-form'

import { CInputControlled } from '@/v3/presentation/newComponents'

interface IAutoComplete
  extends Omit<AutocompleteProps<any, any, any, any>, 'renderInput'>,
    Omit<UseControllerProps<any>, 'control'> {
  inputProps?: TextFieldProps
  error?: string
  label?: string
  isLoading?: boolean
  multiple?: boolean
  removeMultipleChip?: boolean
  placeholder?: string
}

export const CAutoComplete = ({
  name,
  rules,
  inputProps,
  error,
  label,
  options,
  isLoading,
  removeMultipleChip,
  multiple = false,
  placeholder,
  ...props
}: IAutoComplete) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, formState }) => {
        const errorMessage = get(formState?.errors, `${name}.message`) || error

        const currentSelected =
          multiple && !removeMultipleChip
            ? Array.isArray(field.value)
              ? options.filter((opt) => field.value.includes(opt.value))
              : []
            : options.find(({ value }) => value === field.value)

        return (
          <Autocomplete
            getOptionLabel={(option) => option?.label}
            sx={{ mb: '1rem' }}
            {...field}
            {...props}
            multiple={multiple}
            onChange={(e, newValue, reason, details) => {
              if (props.onChange) props.onChange(e, newValue, reason, details)

              if (reason === 'clear') {
                return field.onChange('')
              }

              if (multiple) {
                return field.onChange(newValue.map((item: any) => item.value))
              } else {
                return field.onChange(newValue?.value || '')
              }
            }}
            noOptionsText='Sem opções'
            options={options}
            loading={isLoading}
            renderInput={(params) => (
              <CInputControlled
                error={!!errorMessage}
                name={name}
                helperText={errorMessage as string}
                {...params}
                {...inputProps}
                placeholder={placeholder || 'Digite para buscar'}
                size='small'
                label={label || 'Selecione'}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {params.InputProps.endAdornment}
                      {isLoading && (
                        <InputAdornment position='end'>
                          <CircularProgress color='inherit' size={20} />
                        </InputAdornment>
                      )}
                    </>
                  ),
                }}
                fullWidth={true}
                sx={{
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              />
            )}
            value={currentSelected || (multiple ? [] : null)}
            isOptionEqualToValue={(option) => option.value === field.value}
          />
        )
      }}
    />
  )
}
