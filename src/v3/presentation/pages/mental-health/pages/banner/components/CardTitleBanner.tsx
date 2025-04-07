import { Box, Button, TypographyProps } from '@mui/material'
import { ReactNode } from 'react'

import { colorSchemaMap } from '@/v3/presentation/constants/banner-color-schema-map'

import { TitleIcon } from './TitleIcon'

type CardTitleBannerProps = {
  title: (args: TypographyProps) => React.ReactNode
  color: 'primary' | 'secondary'
  buttonText?: string
  icon?: ReactNode
  onActionClick: () => void
}

export const CardTitleBanner: React.FC<CardTitleBannerProps> = ({
  title,
  buttonText,
  color,
  icon = <TitleIcon />,
  onActionClick,
}) => {
  return (
    <Box px={3} display='flex' width='100%' flex={1} alignItems='center' justifyContent='center'>
      <Box display='flex' gap={2}>
        {icon}

        <Box>
          {title({
            fontSize: ['26px !important', '26px !important', '26px !important'],
            fontWeight: '800',
            color: 'white',
            lineHeight: '29px',
          })}
          {buttonText && (
            <Button
              sx={{
                backgroundColor: colorSchemaMap.button[color],
                fontSize: ['14px !important', '14px !important', '16px !important'],
                height: [32, 32, 34],
                mt: '26px',
                borderRadius: '8px',
                minWidth: '180px',
                '&:hover': { backgroundColor: colorSchemaMap.button[color] },
              }}
              size='small'
              onClick={onActionClick}
            >
              {buttonText}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  )
}
