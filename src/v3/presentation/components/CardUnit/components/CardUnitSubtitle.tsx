import { Typography } from '@mui/material'

export const CardUnitSubtitle = ({ subtitle }: { subtitle?: string }) => {
  return (
    <Typography variant='h6' color='var(--mui-palette-grey-600)' mr={1}>
      {subtitle}
    </Typography>
  )
}

export default CardUnitSubtitle
