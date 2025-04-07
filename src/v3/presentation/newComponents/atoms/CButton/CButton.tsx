import { Button, SxProps, Theme } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

export type ButtonVariant = 'primary' | 'secondary' | 'link'
export type ButtonSize = 'medium' | 'small'

export type CButtonProps = {
  variant?: ButtonVariant
  disabled?: boolean
  size?: ButtonSize
  loading?: boolean
  onClick?: () => void
  children: React.ReactNode | React.ReactNode[]
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
  sx?: SxProps<Theme>
  href?: string
  target?: string
}

export const variantMap = new Map<string, 'contained' | 'outlined' | 'text'>([
  ['primary', 'contained'],
  ['secondary', 'outlined'],
  ['link', 'text'],
])

const CButton: React.FC<CButtonProps> = ({
  children,
  variant = 'primary',
  disabled = false,
  size = 'small',
  loading = false,
  onClick,
  fullWidth,
  type,
  sx,
  href,
  target,
}: CButtonProps) => {
  if (loading) {
    return (
      <LoadingButton
        onClick={onClick}
        variant={variantMap.get(variant)}
        size={size}
        loading={loading}
        disabled={disabled}
        fullWidth={fullWidth}
      >
        {children}
      </LoadingButton>
    )
  }

  return (
    <Button
      onClick={onClick}
      variant={variantMap.get(variant) || (variant as any)}
      size={size}
      disabled={disabled}
      fullWidth={fullWidth}
      type={type}
      sx={sx}
      data-testid='CButton'
      href={href}
      {...(href ? { target } : {})}
    >
      {children}
    </Button>
  )
}

export default CButton
