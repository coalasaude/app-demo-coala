import { FC, ReactNode } from 'react'
import { Box, Button, PaperProps, ButtonProps } from '@mui/material'
import { useRouter } from 'next/router'

import { spacing } from '@/utils/spacing'
import useMediaQuery from '@/hooks/useMediaQuery'

import HeaderButtonsPortal from '../PageHeader/HeaderButtonsPortal'

import { StyledAppBar, StyledAppBarContainer, StyledArrowBackIcon } from './styles'

interface AppBarProps extends PaperProps {
  children: ReactNode
  onBack?: () => void
  withArrowBack?: boolean
  actionButtonProps?: ButtonProps
  secondaryButtonProps?: ButtonProps & { notUsePortal?: boolean }
}

const AppBar: FC<AppBarProps> = ({
  children,
  onBack,
  withArrowBack = true,
  actionButtonProps,
  secondaryButtonProps,
  sx,
  ...props
}) => {
  const router = useRouter()
  const isSmallDevice = useMediaQuery('sm')

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }

  const renderButtons = () => {
    if (secondaryButtonProps && secondaryButtonProps.notUsePortal && actionButtonProps) {
      return (
        <>
          <Button {...secondaryButtonProps} sx={{ whiteSpace: 'nowrap' }} variant='outlined' />
          <HeaderButtonsPortal>
            <Button
              {...actionButtonProps}
              id={actionButtonProps?.id}
              fullWidth={isSmallDevice}
              sx={{ whiteSpace: 'nowrap', ...actionButtonProps.sx }}
            />
          </HeaderButtonsPortal>
        </>
      )
    } else if (secondaryButtonProps && !secondaryButtonProps.notUsePortal && actionButtonProps) {
      return (
        <HeaderButtonsPortal>
          <Box display='flex' alignItems='center' gap={spacing(2)}>
            <Button
              variant='outlined'
              {...secondaryButtonProps}
              sx={{ whiteSpace: 'nowrap', flex: 1, ...secondaryButtonProps.sx }}
            />
            <Button
              {...actionButtonProps}
              sx={{ whiteSpace: 'nowrap', flex: 1, ...actionButtonProps.sx }}
            />
          </Box>
        </HeaderButtonsPortal>
      )
    } else if (secondaryButtonProps && secondaryButtonProps.notUsePortal && !actionButtonProps) {
      return (
        <Button
          variant='outlined'
          {...secondaryButtonProps}
          sx={{ whiteSpace: 'nowrap', ...secondaryButtonProps.sx }}
        />
      )
    } else if (secondaryButtonProps && !secondaryButtonProps.notUsePortal && !actionButtonProps) {
      return (
        <HeaderButtonsPortal>
          <Button
            {...secondaryButtonProps}
            fullWidth={isSmallDevice}
            sx={{ whiteSpace: 'nowrap', ...secondaryButtonProps.sx }}
            variant='outlined'
          />
        </HeaderButtonsPortal>
      )
    } else if (!secondaryButtonProps && actionButtonProps) {
      return (
        <HeaderButtonsPortal>
          <Button
            {...actionButtonProps}
            fullWidth={isSmallDevice}
            sx={{ whiteSpace: 'nowrap', ...actionButtonProps.sx }}
          />
        </HeaderButtonsPortal>
      )
    }
  }

  return (
    <StyledAppBar {...props}>
      <Box display='flex' alignItems='center' justifyContent='space-between' width='100%'>
        <Box display='flex' alignItems='center' gap={spacing(2)} flex='1'>
          {withArrowBack && <StyledArrowBackIcon onClick={handleBack} sx={{ cursor: 'pointer' }} />}
          <StyledAppBarContainer sx={sx}>{children}</StyledAppBarContainer>
        </Box>
        {renderButtons()}
      </Box>
    </StyledAppBar>
  )
}

export default AppBar
