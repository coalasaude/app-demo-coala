import { Typography } from '@mui/material'

export const CardUnitCaption = ({ title, color }: { title?: string; color?: string }) => {
  return (
    <Typography variant='caption' color={color ? color : 'var(--mui-palette-grey-500)'}>
      {title}
    </Typography>
  )
}

export default CardUnitCaption
