import { Divider, DividerProps } from '@mui/material'

export interface CDividerProps extends DividerProps {
  isDashed?: boolean
}

export const CDivider = (props: CDividerProps) => {
  return (
    <Divider
      {...props}
      sx={{
        ...props.sx,
        borderStyle: `${props.isDashed ? 'dashed' : 'solid'}`,
      }}
    />
  )
}
