import { UseControllerProps } from 'react-hook-form'

export interface ICCheckboxGridProps<T> {
  label?: string
  name: string
  rules?: UseControllerProps['rules']
  errorMessage?: string
  options: {
    value: T
    label: string
  }[]
  transform?: (value: any) => T
  maxItemColumns?: number
  numGridColumns?: number
  maxItemColumnsMobile?: number
  numGridColumnsMobile?: number
  onSelectedValuesChange?: (values: T[]) => void
}
