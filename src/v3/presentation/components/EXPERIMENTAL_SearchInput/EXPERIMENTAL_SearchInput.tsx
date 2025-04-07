import CloseIcon from '@mui/icons-material/Close'
import { InputAdornment } from '@mui/material'
import { debounce } from 'lodash'
import { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'

import { CInput, CInputProps } from '../../newComponents'

export interface ISearchInputRef {
  value: () => string
  setValue: (value: string) => void
}

export interface ISearchInput extends Partial<CInputProps> {
  placeholder?: string
  onSearch?: (value: string) => void
  withDebounce?: boolean
  inputRef?: React.Ref<ISearchInputRef>
  defaultValue?: string
}

export const EXPERIMENTAL_SearchInput = ({
  placeholder = 'Pesquisar',
  withDebounce = true,
  onSearch,
  inputRef,
  defaultValue = '',
  sx,
  ...props
}: Partial<ISearchInput>) => {
  const [value, setValue] = useState(defaultValue)

  const ref = useRef<HTMLInputElement>(null)

  const debouncedSetSearch = useMemo(
    () =>
      debounce((value) => {
        onSearch?.(value)
      }, 600),
    [onSearch],
  )

  const handleChange = (value: string) => {
    setValue(value)

    if (withDebounce) {
      debouncedSetSearch(value)
    } else {
      onSearch?.(value)
    }
  }

  useImperativeHandle(inputRef, () => ({
    value: () => ref.current?.value || '',
    setValue: (value: string) => {
      setValue(value)
    },
  }))

  useEffect(() => {
    if (value) {
      ref.current?.focus()
    }
  }, [onSearch, value])

  return (
    <CInput
      name='search_input'
      ref={ref}
      onChange={(e) => handleChange(e.target.value)}
      value={value}
      inputType='search'
      placeholder={placeholder}
      label={placeholder}
      InputProps={{
        endAdornment: !!value ? (
          <InputAdornment
            position='end'
            sx={{ cursor: 'pointer ' }}
            onClick={() => handleChange('')}
          >
            <CloseIcon sx={(theme) => ({ color: theme.palette.grey[600] })} />
          </InputAdornment>
        ) : undefined,
      }}
      sx={{
        maxWidth: 320,
        ...sx,
      }}
      {...props}
    />
  )
}
