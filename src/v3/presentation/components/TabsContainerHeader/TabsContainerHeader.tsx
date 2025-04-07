import { Box, ButtonProps, Typography } from '@mui/material'
import { SvgIconComponent } from '@mui/icons-material'
import { ReactNode } from 'react'

import { spacing } from '@/utils/spacing'

import Button from '../Button'
import NavbarActions from '../NavbarActions'

import { TabsContainerHeaderContainer, TabsContainerHeaderWrapper } from './style'

interface TabsContainerHeaderProps {
  label: string | ReactNode
  buttonLabel?: string
  buttonIcon?: SvgIconComponent
  onClick?: () => void
  onSecondaryClick?: () => void
  secondaryButtonLabel?: string
  secondaryButtonProps?: ButtonProps
  buttonProps?: ButtonProps
  withPadding?: boolean
  pt?: number | string
}

export const TabsContainerHeader = ({
  withPadding,
  label,
  buttonLabel,
  buttonIcon: Icon,
  secondaryButtonLabel,
  onSecondaryClick,
  secondaryButtonProps,
  buttonProps,
  onClick,
}: TabsContainerHeaderProps) => {
  const px = withPadding ? spacing(0) : undefined
  const pt = withPadding ? spacing(2) : undefined
  const pb = withPadding ? spacing(2) : [spacing(1.5), spacing(2)]

  return (
    <TabsContainerHeaderWrapper pt={pt} pb={pb} px={px}>
      <TabsContainerHeaderContainer>
        {typeof label === 'string' ? <Typography variant='h4'>{label}</Typography> : label}
        {buttonLabel && (
          <NavbarActions>
            <Box display='flex' gap={2} flex={1} justifyContent='flex-end'>
              {secondaryButtonLabel && (
                <Button
                  onClick={onSecondaryClick}
                  size='small'
                  variant='outlined'
                  {...secondaryButtonProps}
                  sx={{ width: ['100%', 'fit-content'], ...secondaryButtonProps?.sx }}
                >
                  {secondaryButtonLabel}
                </Button>
              )}
              <Button
                onClick={onClick}
                size='small'
                sx={{ width: ['100%', 'fit-content'] }}
                {...buttonProps}
              >
                {Icon && <Icon sx={{ width: 18, height: 18, marginRight: 1 }} />}
                {buttonLabel}
              </Button>
            </Box>
          </NavbarActions>
        )}
      </TabsContainerHeaderContainer>
    </TabsContainerHeaderWrapper>
  )
}
