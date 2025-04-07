import { Close } from '@mui/icons-material'
import { InputAdornment } from '@mui/material'

export const createInputFilterAddons = (onClean: (...params: any) => void, hasValue?: boolean) => {
  return {
    InputProps: {
      endAdornment: hasValue ? (
        <InputAdornment position='end' sx={{ cursor: 'pointer ' }} onClick={onClean}>
          <Close sx={(theme) => ({ color: theme.palette.grey[600] })} />
        </InputAdornment>
      ) : undefined,
      inputProps: { prefix: '' },
    },
  }
}
