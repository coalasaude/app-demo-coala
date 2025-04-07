import { Box } from '@mui/material'

import { BaseButtonFormData } from './BaseButtonFormData'
import { useResponsiveWidth } from './hook/useResponsiveWidth'

type Props = {
  children: React.ReactNode
  onClick?: () => void
  canAction?: boolean
  withButton?: boolean
  widthVariant?: string
}

export const BaseWrapperFormData = ({
  children,
  onClick,
  canAction = true,
  withButton = true,
  widthVariant,
}: Props) => {
  const width = useResponsiveWidth(widthVariant)

  return (
    <Box display='flex' alignItems='center' gap={2} width={width}>
      {children}
      {withButton && <BaseButtonFormData onClick={onClick} canAction={canAction} />}
    </Box>
  )
}
