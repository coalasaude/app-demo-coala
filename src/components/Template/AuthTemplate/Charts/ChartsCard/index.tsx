import React, { ComponentType } from 'react'
import { Box, Typography } from '@mui/material'
import { SvgIconComponent } from '@mui/icons-material'

import Paper from '@/v3/presentation/components/Paper'
import ContentWrapper from '@/v3/presentation/components/layout/ContentWrapper'

export const ChartsCard = ({
  children,
  title,
  subtitle,
  Svg,
  style,
  onClick,
  Icon,
}: {
  title: string
  children: React.ReactNode
  subtitle?: string
  Svg?: ComponentType
  style?: React.CSSProperties
  Icon?: SvgIconComponent
  onClick?: () => void
}) => {
  return (
    <Paper style={style} height='100%'>
      <ContentWrapper sx={{ width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <Box display='flex' gap={2.5} alignItems='center'>
            {Svg && <Svg />}
            <Typography variant='h4'>{title}</Typography>
            {Icon && (
              <Box ml='auto'>
                <Icon
                  onClick={onClick}
                  sx={{ fill: 'var(--mui-palette-primary-main)', cursor: 'pointer' }}
                />
              </Box>
            )}
          </Box>
          {subtitle && (
            <Box my={1}>
              <Typography variant='h5' fontWeight='light'>
                {subtitle}
              </Typography>
            </Box>
          )}
          {children}
        </Box>
      </ContentWrapper>
    </Paper>
  )
}

export default ChartsCard
