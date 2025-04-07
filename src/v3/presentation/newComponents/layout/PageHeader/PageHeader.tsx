import React, { FC, ReactNode } from 'react'
import { SxProps } from '@mui/material'

import AppBar from '@/v3/presentation/components/AppBar'
import { ButtonProps } from '@/v3/presentation/components/Button'

import PageTitle from '../PageTitle'

export interface PageHeaderProps {
  title: string
  remove?: string
  onRemove?: () => void
  withArrowBack?: boolean
  onBack?: () => void
  actionButtonProps?: ButtonProps
  secondaryButtonProps?: ButtonProps & { notUsePortal?: boolean }
  children?: ReactNode
  sx?: SxProps
}

export const PageHeader: FC<PageHeaderProps> = ({
  title,
  withArrowBack,
  onBack,
  actionButtonProps,
  secondaryButtonProps,
  children,
  sx
}) => (
  <>
    <AppBar
      withArrowBack={withArrowBack}
      onBack={onBack}
      actionButtonProps={actionButtonProps}
      secondaryButtonProps={secondaryButtonProps}
      sx={sx}
    >
      <PageTitle>{title}</PageTitle>
      {children}
    </AppBar>
  </>
)
export default PageHeader
