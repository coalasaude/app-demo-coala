import React from 'react'

import { CInputProps } from '@/v3/presentation/newComponents/atoms/CInput'

import { createInputFilterAddons } from '../../Addons/InputFilterAddons'

import { StyledFilterInput } from './styles'

type Input = CInputProps & { onClearAddon?: (...props: any) => any }
const FilterInput: React.FC<Input> = React.forwardRef(({ onClearAddon, ...props }, ref) => {
  return (
    <StyledFilterInput
      ref={ref as any}
      inputType='search'
      {...props}
      {...createInputFilterAddons(() => {
        if (onClearAddon) {
          onClearAddon()
        }
      }, props.value as any)}
    />
  )
})

FilterInput.displayName = 'FilterInput'

export default FilterInput
