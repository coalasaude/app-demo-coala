import { BoxProps } from '@mui/material'

interface boxProps extends BoxProps {
  prefix?: string
}
export interface IFormDependentDataProps {
  boxProps: boxProps
  prefix?: string
  inputProps?: {
    disabledEmail: boolean
    disabledPhone: boolean
    disabledName: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  }
}
