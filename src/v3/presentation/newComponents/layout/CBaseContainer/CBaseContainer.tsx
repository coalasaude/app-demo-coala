import { Box, PaperProps, Typography } from '@mui/material'
import React from 'react'

import { CDivider } from '@/v3/presentation/newComponents'
import { FormButtons } from '@/v3/presentation/components/FormButtons'
import { FormButtonsProps } from '@/v3/presentation/components/FormButtons/types'
import NavbarActions from '@/v3/presentation/components/NavbarActions'
import { ContentWrapper } from '@/v3/presentation/components/layout/ContentWrapper/styles'
import Paper from '@/v3/presentation/components/Paper'

interface ICBaseContainerProps extends PaperProps {
  children: React.ReactNode
  startIcon?: React.ReactNode
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
  bottomMargin?: number
  noBorder?: boolean
  withContentPadding?: boolean
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
  boxShadow,
  minWidth = '160px',
  startIcon,
  formButtonsProps,
  sx,
  bottomMargin = 4,
  withContentPadding = true,
  noBorder,
  ...props
}) => {
  return (
    <Paper noBorder={noBorder} sx={{ mt, boxShadow, ...sx }} {...props}>
      <ContentWrapper disableContentPadding={!withContentPadding}>
        {title && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
                mt={[0, 2]}
                justifyContent='flex-end'
                confirmLabel={buttonLabel}
                cancelLabel={cancelLabel}
                disableConfirm={buttonDisabled}
                isLoading={isLoading}
                onConfirm={onConfirm}
                onCancel={onCancel}
                minWidth={['100%', minWidth]}
                startIcon={startIcon}
                {...formButtonsProps}
              />
            </NavbarActions>
          </Box>
        )}
      </ContentWrapper>
    </Paper>
  )
}
