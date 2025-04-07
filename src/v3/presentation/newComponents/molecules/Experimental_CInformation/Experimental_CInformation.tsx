import { Box, Typography } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

import { CTooltip } from '@/v3/presentation/newComponents/atoms/CTooltip'

export type InformationProps = {
  title: string
  description?: string
  color?: string
}

export const Experimental_CInformation = ({ title, description, color }: InformationProps) => {
  const textColor =
    title === 'Ativo' ? 'var(--mui-palette-success-main)' : 'var(--mui-palette-error-main)'
  return (
    <CTooltip description={description || title}>
      <Box
        display='flex'
        alignItems='center'
        gap={0.5}
        color={color || 'var(--mui-palette-grey-400)'}
      >
        <Typography variant='caption' color={textColor}>
          {title}
        </Typography>

        <InfoOutlinedIcon sx={{ width: '12px', height: '13px', fill: textColor }} />
      </Box>
    </CTooltip>
  )
}
