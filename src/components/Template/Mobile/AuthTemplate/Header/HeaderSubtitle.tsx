import { Typography } from '@mui/material'

export const HeaderSubtitle = ({ text, subtitle }: { text: string; subtitle?: string }) => {
  return (
    <Typography
      variant={subtitle ? 'h4' : 'h5'}
      color={subtitle ? 'var(--mui-palette-grey-700)' : 'var(--mui-palette-grey-700)'}
    >
      {text}
    </Typography>
  )
}

export default HeaderSubtitle
