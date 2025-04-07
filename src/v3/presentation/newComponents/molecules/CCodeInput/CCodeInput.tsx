import { Stack, Typography } from '@mui/material'
import React from 'react'

import { onlyNumbers } from '@/v3/utils/onlyNumbers'

export interface CCodeInputProps {
  label: string
  value?: string
  length?: number
  error?: boolean
  onlyNumbers?: boolean
  helperText?: string
  onChange?: (value: string) => void
}

const CCodeInput: React.FC<CCodeInputProps> = ({
  label,
  helperText,
  length = 6,
  error,
  value: inputValue,
  onlyNumbers: isOnlyNumbers,
  onChange,
}) => {
  const [value, setValue] = React.useState('')

  const inputRefs = React.useRef<HTMLInputElement[]>([])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const v = event.target.value
    if (isOnlyNumbers) {
      if (v && !/^\d+$/.test(v)) {
        return
      }
    }

    setValue((prev) => {
      const next = prev.split('')
      next[index] = v[0] || ''
      return next.join('')
    })
    if (v) {
      const nextInput = inputRefs.current[index + 1]
      if (nextInput) {
        nextInput.disabled = false
        nextInput.focus()
      }
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
    const input = inputRefs.current[index]
    const previousInput = inputRefs.current[index - 1]
    const nextInput = inputRefs.current[index + 1]

    switch (e.key) {
      case 'ArrowLeft':
        if (previousInput) {
          previousInput.focus()
        }
        break
      case 'ArrowRight':
        if (nextInput) {
          nextInput.focus()
        }
        break
      case ' ':
      case 'Spacebar':
        e.preventDefault()
        break
      default:
        break
    }

    if ((e.key === 'Backspace' || e.key === 'Delete') && input.value === '') {
      setValue((prevCode) => prevCode.slice(0, index) + prevCode.slice(index + 1))
      if (previousInput) {
        previousInput.focus()
      }
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>, index: number) {
    let pastedText = e.clipboardData.getData('text')
    if (isOnlyNumbers) pastedText = onlyNumbers(pastedText)

    if (pastedText) {
      for (let i = 0; i < pastedText.length; i++) {
        if (inputRefs.current[index + i]) {
          inputRefs.current[index + i].value = pastedText[i]
          handleChange(
            { target: { value: pastedText[i] } } as React.ChangeEvent<HTMLInputElement>,
            index + i
          )
        }
      }
    }
  }

  React.useEffect(() => {
    inputRefs.current[0]?.focus()
    inputRefs.current.forEach((input, i) => {
      if (i > 0) {
        input.disabled = true
      }
    })
  }, [])

  React.useEffect(() => {
    setValue(inputValue || '')
  }, [inputValue])

  React.useEffect(() => {
    onChange?.(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <Stack gap={1}>
      <Typography>{label}</Typography>
      <Stack
        direction='row'
        gap={1}
        justifyContent='center'
        alignItems='center'
        sx={({ spacing, palette }) => ({
          '& > .c-code-input__input': {
            width: spacing(6),
            height: spacing(7),
            fontSize: 16,
            textAlign: 'center',
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: error ? `${palette.error.main} !important` : 'rgba(0, 0, 0, 0.23)',
            borderRadius: '4px',
            '&:hover': {
              borderColor: palette.common.black,
            },
            '&:focus': {
              outline: 'none',
              borderWidth: 2,
              borderColor: palette.primary.main,
            },
            '&:disabled': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
              color: 'rgba(0, 0, 0, 0.23)',
            },
          },
        })}
      >
        {Array(length)
          .fill('')
          .map((_, i) => (
            <input
              key={i}
              type='text'
              className='c-code-input__input'
              maxLength={1}
              value={value[i] || ''}
              disabled={inputRefs.current[i - 1] && !inputRefs.current[i - 1].value}
              onChange={(e) => handleChange(e, i)}
              onFocus={(e) => e.target.select()}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onPaste={(e) => handlePaste(e, i)}
              ref={(el) => (el ? (inputRefs.current[i] = el) : null)}
            />
          ))}
      </Stack>
      <Typography
        variant='caption'
        color={({ palette }) => (error ? palette.error.main : 'rgba(0, 0, 0, 0.6)')}
      >
        {helperText}
      </Typography>
    </Stack>
  )
}

export default CCodeInput
