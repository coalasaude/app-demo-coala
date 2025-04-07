import { Box, BoxProps } from '@mui/material'
import Menu, { MenuProps } from '@mui/material/Menu'
import { MenuItemProps } from '@mui/material/MenuItem'
import { useState } from 'react'

import { CMenuItem } from '../../atoms/CMenuItem/CMenuItem'

interface CMenuProps {
  actionComponent: React.ReactNode
  items: MenuItemProps[]
  anchorOrigin?: MenuProps['anchorOrigin']
  transformOrigin?: MenuProps['transformOrigin']
  boxProps?: BoxProps
}

export const CMenu = ({ actionComponent, items, ...props }: CMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isOpen = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation()
    setAnchorEl(null)
  }

  return (
    <>
      <Box onClick={handleClick} {...props.boxProps}>
        {actionComponent}
      </Box>
      <Menu id='menu' anchorEl={anchorEl} open={isOpen} onClose={handleClose} {...props}>
        {items.map((item, index) => (
          <CMenuItem
            key={index}
            {...item}
            onClick={(e) => {
              e.stopPropagation()
              item?.onClick && item.onClick(e)
              handleClose(e)
            }}
            hasDivider={index === items.length - 1 ? false : true}
          />
        ))}
      </Menu>
    </>
  )
}
