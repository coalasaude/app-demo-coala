import { BoxProps } from '@mui/material'

export interface IAddressFromProps extends BoxProps {
  ufOptions?: { value: string; label: string }[]
}
