import { Avatar, Typography } from '@mui/material'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import { SvgIconProps } from '@mui/material/SvgIcon'

type CAvatarSize = 'small' | 'medium' | 'large' | 'extraLarge'

export interface CAvatarProps {
  type: 'icon' | 'initials' | 'photo'
  size: CAvatarSize
  name?: string
  imageUrl?: string
  onClick?: () => void
  isClickable?: boolean
  photoFallback?: 'icon' | 'initials'
  SvgIcon?: React.ComponentType<SvgIconProps>
}

const cAvatarSizeMap: Record<CAvatarSize, string> = {
  small: '24px',
  medium: '28px',
  large: '40px',
  extraLarge: '60px',
}

const iconSizeMap: Record<CAvatarSize, string> = {
  small: '16px',
  medium: '18px',
  large: '24px',
  extraLarge: '48px',
}

const initialsSizeMap: Record<CAvatarSize, 'h6' | 'h5' | 'h4' | 'h1'> = {
  small: 'h6',
  medium: 'h5',
  large: 'h4',
  extraLarge: 'h1',
}

const getInitials = (name: string): string => {
  const splittedName = name.split(' ').filter((n) => n)
  const isCompositeName = splittedName.length > 1
  return isCompositeName ? splittedName[0][0] + splittedName[1][0] : name[0] + name[1]
}

export const CAvatar = (props: CAvatarProps) => {
  const { size, type, onClick, isClickable, SvgIcon = PersonOutlineOutlinedIcon } = props

  if (type === 'icon') {
    return (
      <Avatar sx={{ width: cAvatarSizeMap[size], height: cAvatarSizeMap[size] }} onClick={onClick}>
        <SvgIcon
          sx={{
            fontSize: iconSizeMap[size],
            width: iconSizeMap[size],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: isClickable ? 'pointer' : 'default',
          }}
        />
      </Avatar>
    )
  }

  if (type === 'initials') {
    const { name, onClick, isClickable } = props
    const initials = getInitials(name || '')

    return (
      <Avatar sx={{ width: cAvatarSizeMap[size], height: cAvatarSizeMap[size] }} onClick={onClick}>
        <Typography
          variant={initialsSizeMap[size]}
          sx={{
            color: 'var(--mui-palette-grey-500)',
            fontWeight: 700,
            cursor: isClickable ? 'pointer' : 'default',
          }}
        >
          {initials}
        </Typography>
      </Avatar>
    )
  }

  if (type === 'photo') {
    const { imageUrl, name, onClick, isClickable, photoFallback = 'icon' } = props
    const initials = getInitials(name || '')

    return (
      <Avatar
        alt={name}
        onClick={onClick}
        src={imageUrl}
        sx={{
          width: cAvatarSizeMap[size],
          height: cAvatarSizeMap[size],
          cursor: isClickable ? 'pointer' : 'default',
        }}
      >
        {photoFallback === 'icon' && (
          <PersonOutlineOutlinedIcon
            sx={{
              fontSize: iconSizeMap[size],
              width: iconSizeMap[size],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isClickable ? 'pointer' : 'default',
            }}
          />
        )}
        {photoFallback === 'initials' && (
          <Typography
            variant={initialsSizeMap[size]}
            sx={{
              color: 'var(--mui-palette-grey-500)',
              fontWeight: 600,
              cursor: isClickable ? 'pointer' : 'default',
            }}
          >
            {initials}
          </Typography>
        )}
      </Avatar>
    )
  }

  return null
}
