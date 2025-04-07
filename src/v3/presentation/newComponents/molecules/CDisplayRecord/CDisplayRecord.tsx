import { Box, BoxProps, Typography, TypographyProps } from '@mui/material'
import { ReactNode } from 'react'

import { CDivider, CTooltip } from '../../atoms'

export interface CDisplayRecordProps {
  label: ReactNode
  value?: ReactNode
  withDivider?: boolean
  onClick?: () => void
  withMinHeight?: boolean
  labelProps?: TypographyProps
  valueProps?: TypographyProps
  boxProps?: BoxProps
  clickable?: boolean
  tooltipDescription?: string
  noWrap?: boolean
}

export const CDisplayRecord = ({
  label,
  value,
  withDivider = true,
  onClick,
  withMinHeight,
  labelProps,
  valueProps,
  clickable,
  tooltipDescription,
  noWrap,
  boxProps,
}: CDisplayRecordProps) => {
  const { variant: labelVariant, color: labelColor } = labelProps || {}
  const { variant: valueVariant, color: valueColor } = valueProps || {}

  return (
    <Box {...boxProps}>
      <Typography
        variant={labelVariant ? labelVariant : 'caption'}
        color={labelColor ? labelColor : 'var(--mui-palette-grey-500)'}
        {...labelProps}
      >
        {label}
      </Typography>
      <CTooltip description={tooltipDescription}>
        <Typography
          variant={valueVariant ? valueVariant : 'body2'}
          minHeight={withMinHeight ? '30px' : ''}
          whiteSpace={noWrap ? 'nowrap' : 'none'}
          overflow={noWrap ? 'hidden' : 'unset'}
          textOverflow={noWrap ? 'ellipsis' : 'unset'}
          color={valueColor}
          sx={{ cursor: clickable || onClick ? 'pointer' : 'default' }}
          onClick={onClick}
          {...valueProps}
        >
          {value ?? '-'}
        </Typography>
      </CTooltip>
      {withDivider && <CDivider sx={{ mt: '4px' }} />}
    </Box>
  )
}
