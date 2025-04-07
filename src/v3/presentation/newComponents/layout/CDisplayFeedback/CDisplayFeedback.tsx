import { Box, Stack, Typography } from '@mui/material'

import { CButton } from '@/v3/presentation/newComponents'
import { useBreakpoint } from '@/hooks/useBreakpoints'

import { CButtonProps } from '../../atoms/CButton/CButton'

interface CDisplayFeedbackProps {
  title: string
  children: React.ReactNode
  subtitle?: string
  align?: 'center' | 'left' | 'right'
  buttonProps?: CButtonProps
}

export const CDisplayFeedback = ({
  children,
  title,
  subtitle,
  buttonProps,
  align,
}: CDisplayFeedbackProps) => {
  const isMobile = useBreakpoint('sm')

  return (
    <Stack
      direction='row'
      width='100%'
      justifyContent='center'
      alignItems='center'
      gap={isMobile ? 2 : 5}
    >
      <Box maxWidth={270} textAlign={align}>
        <Typography variant={isMobile ? 'h4' : 'h2'} color={(theme) => theme.palette.primary.dark}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant='caption' color={(theme) => theme.palette.grey[500]} mt={1}>
            {subtitle}
          </Typography>
        )}
        {buttonProps && (
          <Box display='flex' justifyContent='center' mt={2}>
            <CButton {...buttonProps}>{buttonProps.children}</CButton>
          </Box>
        )}
      </Box>
      <Box width={268}>{children}</Box>
    </Stack>
  )
}
