import { Box, SvgIconProps, Typography } from '@mui/material'

import { SchemaTypeEnum } from '../../../enums/schema-types.enum'

export const CStatusColor: Record<SchemaTypeEnum, string> = {
  [SchemaTypeEnum.SUCCESS]: 'var(--mui-palette-success-main)',
  [SchemaTypeEnum.ERROR]: 'var(--mui-palette-error-main)',
  [SchemaTypeEnum.NEUTRAL]: 'var(--mui-palette-grey-400)',
  [SchemaTypeEnum.WARNING]: 'var(--mui-palette-warning-main)',
  [SchemaTypeEnum.BRAND]: 'var(--mui-palette-primary-main)',
  [SchemaTypeEnum.EMERGENCY]: 'var(--mui-palette-emergency-main)',
  [SchemaTypeEnum.INFORMATION]: 'var(--mui-palette-info-main)',
}

type CStatusProps = {
  label: string
  type: SchemaTypeEnum
  variant?: 'icon' | 'badge'
  IconComponent?: React.ComponentType<SvgIconProps>
}

export const CStatus = ({ label, type, variant = 'badge', IconComponent }: CStatusProps) => {
  if (variant === 'badge') {
    return (
      <Box display='flex' alignItems='center' height='100%' gap={1}>
        <Box borderRadius='50%' bgcolor={CStatusColor[type]} width={7} height={7} />
        <Typography variant='body1'>{label}</Typography>
      </Box>
    )
  }

  if (variant === 'icon' && IconComponent) {
    return (
      <Box display='flex' alignItems='center' height='100%' gap={1}>
        <IconComponent />
        <Typography variant='body1'>{label}</Typography>
      </Box>
    )
  }
}
