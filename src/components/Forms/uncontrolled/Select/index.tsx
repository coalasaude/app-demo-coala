import * as React from 'react'
import {
  InputLabelProps,
  FormControlProps,
  Select as MSelect,
  FormControl,
  InputLabel,
} from '@mui/material'
import { SelectInputProps } from '@mui/material/Select/SelectInput'

type ISelect = Partial<SelectInputProps> & {
  InputLabelProps?: InputLabelProps
  FormControlProps?: FormControlProps
  label?: string
  children?: React.ReactNode
  fullWidth?: boolean
  nullOptionText?: string
  defaultValue?: any
  disabledNullOption?: boolean
  options?: {
    value: any
    label: string
  }[]
}
export default function Select({
  children,
  label,
  options,
  nullOptionText,
  disabledNullOption,
  defaultValue,
  ...props
}: ISelect) {
  const labelId = `${props.name}-label`
  return (
    <FormControl fullWidth>
      <InputLabel id={labelId} htmlFor={props.name} shrink>
        {label}
      </InputLabel>
      <MSelect
        labelId={labelId}
        label={label}
        placeholder=''
        displayEmpty={true}
        sx={(theme) => ({ borderColor: `${theme.palette.grey[300]} !important` })}
        variant={props.variant || 'outlined'}
        defaultValue={defaultValue}
        inputProps={{}}
        {...props}
        notched
        native={!props.multiple}
        value={props.value || (props.multiple ? [] : '')}
        size='small'
      >
        {options ? (
          <>
            {!disabledNullOption && <option value=''>{nullOptionText ?? '-'}</option>}
            {options.map(({ value, label }) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </>
        ) : (
          children
        )}
      </MSelect>
    </FormControl>
  )
}
