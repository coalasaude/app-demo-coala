import { Paper, Stack, Typography } from '@mui/material'

import { CButton } from '../../atoms'

interface Experimental_CVerticalModalProps {
  title: string | React.ReactNode
  subtitle?: string
  illustration?: React.ReactNode

  primaryButton?: React.ReactNode
  primaryButtonLabel?: string
  onPrimaryButtonClick?: () => void

  secondaryButton?: React.ReactNode
  secondaryButtonLabel?: string
  onSecondaryButtonClick?: () => void

  width?: number
}

export const Experimental_CVerticalModal = (props: Experimental_CVerticalModalProps) => {
  return (
    <Paper elevation={3} sx={{ width: props.width || 288, p: 2, textAlign: 'center' }}>
      <Stack px={1} alignItems='center' gap={2}>
        {props.illustration}

        {typeof props.title === 'string' ? (
          <Typography variant='h1'>{props.title}</Typography>
        ) : (
          props.title
        )}

        {props.subtitle && <Typography variant='body1'>{props.subtitle}</Typography>}
      </Stack>

      <Stack gap={0.5} mt={3} px={2}>
        {props.primaryButton ? (
          props.primaryButton
        ) : (
          <CButton variant='primary' onClick={props.onPrimaryButtonClick}>
            {props.primaryButtonLabel || 'Confirmar'}
          </CButton>
        )}

        {props.secondaryButton ? (
          props.secondaryButton
        ) : (
          <CButton variant='link' onClick={props.onSecondaryButtonClick}>
            {props.secondaryButtonLabel || 'Fechar'}
          </CButton>
        )}
      </Stack>
    </Paper>
  )
}
