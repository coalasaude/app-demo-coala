import MenuItem, { MenuItemProps } from '@mui/material/MenuItem'

import { CDivider } from '@/v3/presentation/newComponents'

export interface CMenuItemProps extends MenuItemProps {
  hasDivider?: boolean
}

export const CMenuItem = ({ hasDivider = true, ...props }: CMenuItemProps) => {
  return (
    <>
      <MenuItem
        {...props}
        sx={{
          fontSize: '14px',
          minWidth: '180px',
          lineHeight: '140%',
          '@media (max-width: 960px)': {
            fontSize: '12px',
          },
          fontWeight: 400,
          paddingX: 2,
          paddingY: 1,
          ...props.sx,
        }}
      />
      {hasDivider && <CDivider sx={{ mx: 1, my: '0 !important' }} />}
    </>
  )
}
