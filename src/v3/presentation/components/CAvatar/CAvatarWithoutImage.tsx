import { CorporateFare } from '@mui/icons-material'

import { CAvatar } from '../../newComponents'

export type GenericAvatarProps = {
  variant: 'organization' | 'user'
}

export const CAvatarWithoutImage = ({ variant = 'user' }: GenericAvatarProps) => {
  return (
    <CAvatar
      size='large'
      type='icon'
      SvgIcon={variant === 'organization' ? CorporateFare : undefined}
    />
  )
}
