import { Box } from '@mui/material'
import { CSSProperties, useCallback, useEffect, useState } from 'react'

import SlideRule from '@/v3/presentation/components/SlideRuler'
import useMediaQuery from '@/hooks/useMediaQuery'

import { SlideRuleProps } from '../SlideRuler/data/type'

import { StyledInput, UnitLabel } from './styles'

interface SlideRulerInputProps extends SlideRuleProps {
  initialValue?: number
  onChange?: (value: number) => void
  labelSuffix?: string
  variant: 'weight' | 'height'
  min?: number
  max?: number
  step?: number
  style?: CSSProperties
}

const SlideRulerInput = ({
  initialValue = 70.3,
  onChange,
  min = 0,
  max = 300,
  step = 0.1,
  labelSuffix,
  variant,
  style = {
    backgroundColor: 'var(--mui-palette-grey-200)',
    borderRadius: '16px',
  },
  ...props
}: SlideRulerInputProps) => {
  const [value, setValue] = useState(initialValue)
  const isMobile = useMediaQuery('sm')
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value
    if (inputValue?.match(/^0[0-9].*$/)) {
      inputValue = inputValue.replace(/^0+/, '')
    }
    setValue(parseFloat(inputValue))
  }, [])

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      let value = parseFloat(e.target.value)
      value = isNaN(value) ? 0 : value
      value = Math.max(min, Math.min(value, max))
      setValue(value)
    },
    [max, min]
  )

  useEffect(() => {
    onChange?.(value)
  }, [value, onChange])

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <Box sx={{ maxWidth: '150px', position: 'relative', display: 'inline-block' }}>
        <StyledInput
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          step={step}
          min={min}
          max={max}
          type='number'
        />
        {labelSuffix && <UnitLabel variant='h1'>{labelSuffix}</UnitLabel>}
      </Box>
      <SlideRule
        value={isNaN(value) ? 0 : value}
        variant={variant}
        width={isMobile ? 700 : 500}
        onChange={setValue}
        style={style}
        min={min}
        max={max}
        step={step}
        {...props}
      />
    </Box>
  )
}

export default SlideRulerInput
