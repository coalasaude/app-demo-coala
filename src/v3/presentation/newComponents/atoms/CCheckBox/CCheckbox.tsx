import { Checkbox, CheckboxProps } from '@mui/material'

export interface CCheckboxProps extends CheckboxProps {
  haveError?: boolean
}

export const CCheckbox = (props: CCheckboxProps) => {
  return (
    <Checkbox
      color={!!props.haveError ? 'error' : 'primary'}
      {...props}
      sx={{
        ...props.sx,
        svg: {
          color: !!props.haveError ? 'var(--mui-palette-error-main)' : 'none',
        },
        ':hover': {
          backgroundColor: 'var(--mui-palette-primary-light)',
        },
      }}
    />
  )
}
