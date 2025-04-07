import { Stack } from '@mui/material'

import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { CContainerContent } from '@/v3/presentation/newComponents'

interface StepContainerProps {
  children: React.ReactNode

  confirmLabel?: string
  cancelLabel?: string

  onConfirm?: () => void
  onCancel?: () => void

  isLoading?: boolean
  noPadding?: boolean
  noBorder?: boolean
}

export const StepContainer = ({
  children,
  confirmLabel = 'Próximo',
  cancelLabel = 'Voltar',
  onConfirm,
  noPadding,
  noBorder,
  ...props
}: StepContainerProps) => {
  return (
    <CBaseContainer
      sx={{ p: noPadding ? 0 : 2, boxShadow: 'none' }}
      buttonLabel={confirmLabel}
      cancelLabel={cancelLabel}
      onConfirm={onConfirm}
      {...props}
    >
      <CContainerContent noBorder={noBorder}>
        <Stack gap={4}>{children}</Stack>
      </CContainerContent>
    </CBaseContainer>
  )
}
