import React, { useState, forwardRef, useCallback } from 'react'
import { RemoveRedEye, VisibilityOffOutlined } from '@mui/icons-material'
import {
  InputAdornment,
  InputBaseComponentProps,
  SxProps,
  TextField,
  TextFieldProps,
  Theme,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

import CurrencyInput, {
  NumberFormatCustomProps,
} from '@/components/Forms/uncontrolled/CurrencyInput'

import { defaultLimitCTextArea } from '../../implementations/form/CTextAreaControlled/CTextAreaControlled'

export type TCInputType = 'text' | 'password' | 'currency' | 'search'
export type TCVariantInput = 'outlined' | 'standard' | 'filled'
export type TCInputSize = 'small' | 'medium'
type InputAdornmentProps = {
  position?: 'start' | 'end'
  children: React.ReactNode
}
type InputProps = {
  startAdornment?: React.ReactElement<InputAdornmentProps>
  endAdornment?: React.ReactElement<InputAdornmentProps>
  inputComponent?: React.ElementType<InputBaseComponentProps>
  inputProps?: Record<string, any>
}

type InputPropsDictionary = {
  [K in TCInputType]?: InputProps
}

export interface CInputProps {
  label?: string
  size?: TCInputSize
  placeholder: string
  fullWidth?: boolean
  disabled?: boolean
  name?: string
  value?: unknown
  defaultValue?: unknown
  inputType?: TCInputType
  variant?: TCVariantInput
  currencyInputProps?: Partial<NumberFormatCustomProps>
  InputProps?: TextFieldProps['InputProps']
  onChange?: TextFieldProps['onChange']
  onFocus?: TextFieldProps['onFocus']
  onBlur?: TextFieldProps['onBlur']
  onClick?: TextFieldProps['onClick']
  InputLabelProps?: TextFieldProps['InputLabelProps']
  helperText?: TextFieldProps['helperText']
  error?: boolean
  sx?: SxProps<Theme> | undefined
  id?: string
  type?: TextFieldProps['type']
  required?: boolean
  autoFocus?: boolean
  multiline?: boolean
  rows?: number | string
  maxRows?: number | string
  minRows?: number | string
  maxLength?: number
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement> | undefined
  onPaste?: React.ClipboardEventHandler<HTMLDivElement>
}

const useTogglePasswordVisibility = () => {
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)
  return [isVisible, toggleVisibility] as const
}

const CInput = forwardRef<HTMLDivElement, CInputProps>(
  (
    {
      inputType = 'text',
      variant = 'outlined',
      currencyInputProps,
      label,
      placeholder,
      value,
      ...props
    },
    ref,
  ) => {
    const [isPasswordVisible, toggleIsPasswordVisibility] = useTogglePasswordVisibility()
    const [isPlaceholderActive, setIsPlaceholderActive] = useState(true)
    const [count, setCount] = useState((value as string)?.length || 0)

    const PassWordIcon = isPasswordVisible ? RemoveRedEye : VisibilityOffOutlined

    const togglePlaceholder = useCallback(() => {
      if (value) setIsPlaceholderActive(false)
      setIsPlaceholderActive(!isPlaceholderActive)
    }, [isPlaceholderActive, value])

    const inputPropsDictionary: InputPropsDictionary = {
      search: {
        startAdornment: <SearchIcon color='disabled' sx={{ p: 0.25, ml: -0.5, mr: 1 }} />,
      },
      password: {
        endAdornment: (
          <InputAdornment
            position='end'
            sx={{ cursor: 'pointer' }}
            onClick={toggleIsPasswordVisibility}
          >
            <PassWordIcon className='cursor-pointer' color='disabled' />
          </InputAdornment>
        ),
      },
      currency: {
        inputComponent: CurrencyInput as any,
        inputProps: { ...currencyInputProps, onChange: props.onChange } as any,
      },
      text: {},
    }

    const getInputType = () => {
      if (inputType === 'password' && isPasswordVisible) {
        return 'text'
      } else if (inputType === 'password' && !isPasswordVisible) {
        return 'password'
      } else {
        return 'text'
      }
    }

    const getLabel = () => {
      if (!label) return ''
      if (inputType === 'search') {
        return undefined
      } else if (isPlaceholderActive && !value) {
        return placeholder
      } else {
        return label
      }
    }

    return (
      <TextField
        onKeyDown={(e) => {
          e.stopPropagation()
          props?.onKeyDown?.(e)
        }}
        onPaste={props.onPaste}
        InputLabelProps={
          inputType == 'search' && isPlaceholderActive && !value
            ? {
                shrink: false,
                style: isPlaceholderActive || !!value ? { marginLeft: 30 } : {},
              }
            : {}
        }
        size={props.size || 'small'}
        variant={variant || 'outlined'}
        error={props.error}
        fullWidth
        {...props}
        id={props.name}
        InputProps={{ ...inputPropsDictionary[inputType], ...props.InputProps }}
        inputRef={ref}
        label={getLabel()}
        placeholder={
          inputType === 'search' && isPlaceholderActive
            ? placeholder
            : label
              ? undefined
              : placeholder
        }
        type={getInputType()}
        value={value}
        helperText={
          props.multiline && props.InputProps?.inputProps?.maxLength !== defaultLimitCTextArea
            ? `${count}/${props.InputProps?.inputProps?.maxLength}`
            : props.helperText
        }
        onChange={(e) => {
          setCount(e?.target?.value?.length)
          props?.onChange?.(e)
        }}
        onFocus={(e) => {
          togglePlaceholder()
          props?.onFocus?.(e)
        }}
        onBlur={(e) => {
          togglePlaceholder()
          props?.onBlur?.(e)
        }}
      />
    )
  },
)

CInput.displayName = 'CInput'

export default CInput
