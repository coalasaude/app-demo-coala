import { UseFormWatch } from 'react-hook-form'

export interface IAlergyFromProps<T = any, R = any> {
  categoryOptions: {
    value: T
    label: string
  }[]
  symptomOptions: { value: R; label: string }[]
  prefixName?: string
  id?: number
  watch: UseFormWatch<any>
}
