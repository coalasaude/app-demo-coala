import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import { CircularProgress, IconButton, InputAdornment, TextFieldProps } from '@mui/material'
import { MouseEvent, useEffect, useRef, useState } from 'react'

import { CInput } from '../..'

export interface ICFileInput {
  accept: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  icon?: React.ReactNode
  label: string
  variant?: 'standard' | 'filled' | 'outlined' | undefined
  name?: string
  InputLabelProps?: TextFieldProps['InputLabelProps']
  errorMessage?: string
  defaultValue?: string
  placeholder?: string
  loading?: boolean
  disabled?: boolean
}

export const CFileInput: React.FC<ICFileInput> = ({
  accept,
  onChange,
  icon = <CloudUploadOutlinedIcon sx={{ color: 'var(--mui-palette-primary-main)' }} />,
  label,
  variant = 'outlined',
  name,
  errorMessage,
  defaultValue = '',
  placeholder,
  loading,
  ...props
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [filename, setFilename] = useState<string>(defaultValue)

  useEffect(() => {
    setFilename(defaultValue)
  }, [defaultValue])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setFilename(event.target.files[0].name)
    } else {
      setFilename('')
    }

    if (onChange) {
      onChange(event)
    }
  }

  const triggerFileSelect = (e: MouseEvent<any>) => {
    e.preventDefault()
    e.stopPropagation()

    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const disabled = loading || props.disabled

  return (
    <>
      <CInput
        fullWidth
        variant={variant}
        label={label || 'Selecione um arquivo'}
        value={filename}
        onClick={!disabled ? triggerFileSelect : undefined}
        size='small'
        disabled={disabled}
        error={!!errorMessage}
        helperText={errorMessage}
        placeholder={placeholder || 'Selecione um arquivo'}
        sx={{ '& .MuiInputLabel-root': { width: 'calc(100% - 55px)' } }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              {loading ? (
                <CircularProgress sx={{ ml: 2 }} size={15} color='inherit' />
              ) : (
                <IconButton edge='end' onClick={triggerFileSelect}>
                  {icon}
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
        {...props}
      />
      <input
        ref={fileInputRef}
        type='file'
        style={{ display: 'none' }}
        accept={accept}
        onChange={handleFileChange}
        name={name}
      />
    </>
  )
}
