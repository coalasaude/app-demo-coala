import { UseControllerProps } from 'react-hook-form'

export interface ICRadioGridProps<T, R> {
  label?: string
  name: string
  options: {
    value: T | R
    label: string
  }[]
  rules?: UseControllerProps['rules']
  errorMessage?: string
  maxItemColumns?: number
  maxItemColumnsMobile?: number
  numGridColumns?: number
  numGridColumnsMobile?: number
  transform?: (value: string) => R
  gridItemsSpacing?: string[]
  onChange?: (value: T | R) => void
}
