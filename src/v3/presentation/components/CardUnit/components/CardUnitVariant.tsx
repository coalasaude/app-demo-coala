import { Typography, TypographyVariant } from '@mui/material'

export const CardUnitVariant = ({
  title,
  variant,
}: {
  title?: string
  variant?: TypographyVariant
}) => {
  return (
    <Typography
      title={title}
      variant={variant}
      sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
    >
      {title || 'Não cadastrado'}
    </Typography>
  )
}

export default CardUnitVariant
