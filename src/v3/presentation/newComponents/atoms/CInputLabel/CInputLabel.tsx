import { InputLabel, Typography } from '@mui/material'

interface CInputLabelProps {
  title: string
  error?: boolean
}

const CInputLabel = ({ title, error }: CInputLabelProps) => {
  return (
    <InputLabel sx={{ mb: 1 }} error={error}>
      <Typography variant='h4' color={error ? 'var(--mui-palette-error-main)' : ''}>
        {title}
      </Typography>
    </InputLabel>
  )
}

export default CInputLabel
