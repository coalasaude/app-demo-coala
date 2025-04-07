import { UseControllerProps } from 'react-hook-form'
import { Autocomplete, AutocompleteProps, CircularProgress, InputAdornment } from '@mui/material'

import { CInput } from '@/v3/presentation/newComponents'

interface IAutoComplete
  extends Omit<AutocompleteProps<any, any, any, any>, 'renderInput'>,
    Omit<UseControllerProps<any>, 'control'> {
  label?: string
  isLoading?: boolean
  placeholder?: string
  handleLinkInstitution?: (id: number, institutionName: string) => void
}

export const SearchFilterInput = ({
  label,
  isLoading,
  options,
  handleLinkInstitution,
  placeholder,
  ...props
}: IAutoComplete) => {
  return (
    <Autocomplete
      getOptionLabel={(option) => option?.label}
      sx={{ mb: '1rem' }}
      {...props}
      noOptionsText='Sem opções'
      options={options}
      loading={isLoading}
      filterOptions={(opt) => opt}
      onChange={(e, value) =>
        handleLinkInstitution && value && handleLinkInstitution(value.value, value.label)
      }
      renderInput={({ ...params }) => (
        <CInput
          {...params}
          size='small'
          placeholder={placeholder || 'Digite para pesquisar'}
          label={label || 'Pesquisa'}
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
        />
      )}
      isOptionEqualToValue={(option) => options.find(({ value }: any) => value === option.value)}
    />
  )
}
