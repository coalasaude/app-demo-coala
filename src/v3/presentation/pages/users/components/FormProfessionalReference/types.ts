import { BoxProps } from '@mui/material'

export interface IFormProfessionalProps extends BoxProps {
  professionalTypeOptions?: { value: string; label: string }[]
  prefix?: string
}
