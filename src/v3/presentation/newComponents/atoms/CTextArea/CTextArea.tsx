import { Box } from '@mui/material'

import CInput, { CInputProps } from '../CInput'
import { defaultLimitCTextArea } from '../../implementations/form/CTextAreaControlled/CTextAreaControlled'

export interface CTextAreaProps extends CInputProps {
  limit?: number
  rows?: number
  maxRows?: number
  minRows?: number
}

export const defaultNumberRowsCTextArea = 3
const CTextArea = ({ limit = defaultLimitCTextArea, rows, ...props }: CTextAreaProps) => {
  if (!rows && !props.maxRows && !props.minRows) {
    rows = defaultNumberRowsCTextArea
  }

  return (
    <Box>
      <CInput
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
    </Box>
  )
}

export default CTextArea
