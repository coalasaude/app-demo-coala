import { Button as MButton, ButtonProps, SxProps, Theme } from '@mui/material'

import useMediaQuery from '@/hooks/useMediaQuery'

type TButton = Omit<ButtonProps, 'color'> & {
  children?: React.ReactNode
  fullWidthOnSmallDevice?: boolean
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | 'white'
    | 'blue_gradient'
    | 'pink_gradient'
    | 'purple_gradient'
    | undefined
}
export const Button: React.FC<TButton> = ({
  children,
  color,
  variant,
  size,
  fullWidthOnSmallDevice,
  ...others
}) => {
  const isSmallDevice = useMediaQuery('sm')
  let style: SxProps<Theme> = {}
  let parsedColor = color
  if (color === 'white') {
    parsedColor = 'primary'
    style = {
      ...style,
      background: 'white',
      border: '1px solid var(--mui-palette-grey-300)',
      color: 'var(--mui-palette-grey-700)',
      '&:hover': {
        background: 'white',
      },
    }
  }
  if (color === 'purple_gradient') {
    parsedColor = 'primary'
    style = {
      ...style,
      background: 'var(--mui-palette-primary-mainGradient)',
      color: 'var(--mui-palette-common-white)',
    }
  }
  if (color === 'pink_gradient') {
    parsedColor = 'secondary'
    style = {
      ...style,
      background: 'var(--mui-palette-secondary-mainGradient)',
      color: 'var(--mui-palette-common-white)',
    }
  }
  if (others.disabled) {
    style = {
      ...style,
      background: 'var(--mui-palette-grey-300)',
    }
  }

  return (
    <MButton
      color={parsedColor as ButtonProps['color']}
      variant={variant || 'contained'}
      size={size || 'large'}
      disableElevation
      sx={style}
      fullWidth={isSmallDevice && !!fullWidthOnSmallDevice ? true : others.fullWidth}
      {...others}
    >
      {children}
    </MButton>
  )
}

export default Button
