import {
  Autocomplete,
  AutocompleteProps,
  CircularProgress,
  InputAdornment,
  TextFieldProps,
} from '@mui/material'
import React from 'react'

import { CInput } from '../../newComponents'

export interface ICAutocompleteUncontrolled
  extends Omit<AutocompleteProps<any, any, any, any>, 'renderInput'> {
  inputProps?: TextFieldProps
  errorMessage?: string
  label?: string
  isLoading?: boolean
  multiple?: boolean
  placeholder?: string
}

export const AutocompleteInput = ({
  inputProps,
  errorMessage,
  label,
  options,
  isLoading,
  multiple = false,
  placeholder,
  ...props
}: ICAutocompleteUncontrolled) => {
  return (
    <Autocomplete
      getOptionLabel={(option) => option?.label}
      sx={{ mb: '1rem' }}
      multiple={multiple}
      noOptionsText='Sem opções'
      options={options}
      loading={isLoading}
      renderInput={(params) => (
        <CInput
          {...params}
          {...inputProps}
          error={!!errorMessage}
          helperText={errorMessage}
          placeholder={placeholder || 'Digite para pesquisar'}
          size='small'
          label={label || 'Pesquisar'}
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
      {...props}
    />
  )
}
