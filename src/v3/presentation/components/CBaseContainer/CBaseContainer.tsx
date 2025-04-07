import { Box, BoxProps, PaperProps, Typography } from '@mui/material'
import React from 'react'

import { CDivider } from '@/v3/presentation/newComponents'

import { FormButtons } from '../FormButtons'
import NavbarActions from '../NavbarActions'
import { FormButtonsProps } from '../FormButtons/types'
import Paper from '../Paper'

interface ICBaseContainerProps extends PaperProps {
  children: React.ReactNode
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  buttonLabel?: string
  cancelLabel?: string
  title?: string
  infoTitle?: React.ReactNode
  mt?: string | number
  buttonDisabled?: boolean
  isLoading?: boolean
  onConfirm?: () => void
  onCancel?: () => void
  elevation?: number
  boxShadow?: string
  minWidth?: string
  formButtonsProps?: FormButtonsProps
  sx?: PaperProps['sx']
  boxProps?: BoxProps
  bottomMargin?: number
}

export const CBaseContainer: React.FC<ICBaseContainerProps> = ({
  children,
  buttonLabel,
  cancelLabel = 'Cancelar',
  title,
  mt,
  isLoading,
  onConfirm,
  onCancel,
  buttonDisabled,
  infoTitle,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  elevation = 2,
  boxShadow,
  minWidth = '160px',
  startIcon,
  endIcon,
  formButtonsProps,
  sx,
  boxProps,
  bottomMargin = 4,
  ...props
}) => {
  return (
    <Paper noBorder sx={{ mt, boxShadow, ...sx }} {...props}>
      {title && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
          {...boxProps}
        >
          <Typography variant='h4' fontWeight='bold' mt={1} mb={2}>
            {title}
          </Typography>
          {infoTitle}
        </Box>
      )}
      <Box>{children}</Box>
      {buttonLabel && (
        <Box mt={bottomMargin} display={['none', 'block']}>
          <CDivider />
          <NavbarActions>
            <FormButtons
              display='flex'
              justifyContent='flex-end'
              confirmLabel={buttonLabel}
              mt={[1, 2]}
              cancelLabel={cancelLabel}
              disableConfirm={buttonDisabled}
              isLoading={isLoading}
              onConfirm={onConfirm}
              onCancel={onCancel}
              minWidth={['100%', minWidth]}
              startIcon={startIcon}
              endIcon={endIcon}
              {...formButtonsProps}
            />
          </NavbarActions>
        </Box>
      )}
    </Paper>
  )
}
