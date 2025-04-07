import { Box, BoxProps } from '@mui/material'

import { defaultNumberRowsCTextArea } from '../../../atoms/CTextArea/CTextArea'
import CInputControlled, { CInputControlledProps } from '../CInputControlled'

export interface CTextAreaPropsControlled extends CInputControlledProps {
  limit?: number
  rows?: number
  maxRows?: number
  minRows?: number
  children?: any
  boxProps?: BoxProps
}
export const defaultLimitCTextArea = 100000
const CTextAreaControlled = ({
  limit = defaultLimitCTextArea,
  rows,
  children,
  boxProps,
  ...props
}: CTextAreaPropsControlled) => {
  if (!rows && !props.maxRows && !props.minRows) {
    rows = defaultNumberRowsCTextArea
  }

  return (
    <Box {...boxProps}>
      <CInputControlled
        multiline
        rows={rows}
        {...props}
        onChange={(e) => {
          if (props.onChange) props.onChange(e)
        }}
        InputProps={{
          inputProps: {
            maxLength: limit,
          },
        }}
      />
      {children}
    </Box>
  )
}

export default CTextAreaControlled
