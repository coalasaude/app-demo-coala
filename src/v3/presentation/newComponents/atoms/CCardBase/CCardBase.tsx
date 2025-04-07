import React, { useState } from 'react'
import { Stack, StackProps, Menu, MenuItem } from '@mui/material'

export interface CCardBaseProps extends StackProps {
  children?: React.ReactNode
  isDisabled?: boolean
  isInteractive?: boolean
  linkUrl?: string
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

export const CCardBase = ({
  children,
  isInteractive = false,
  linkUrl = '',
  onClick,
  ...props
}: CCardBaseProps) => {
  const [contextMenu, setContextMenu] = useState<{ mouseX: number; mouseY: number } | null>(null)
  const disabledStyle = props.isDisabled ? { border: '2px solid var(--mui-palette-grey-100)' } : {}

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault()
    setContextMenu({ mouseX: event.clientX - 2, mouseY: event.clientY - 4 })
  }

  const handleClose = () => {
    setContextMenu(null)
  }

  const handleCopyLink = () => {
    if (linkUrl) {
      navigator.clipboard.writeText(linkUrl)
      handleClose()
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.button === 0 && !contextMenu) {
      onClick?.(event)
    }
  }

  const stackStyles = {
    borderRadius: 2,
    border: '2px solid var(--mui-palette-grey-300)',
    backgroundColor: 'var(--mui-palette-common-background)',
    cursor: isInteractive ? 'pointer' : 'default',
    '&:hover': {
      borderColor: isInteractive ? 'var(--mui-palette-grey-300)' : undefined,
      backgroundColor: isInteractive ? 'var(--mui-palette-grey-100)' : undefined,
    },
    '&:focus': {
      border: isInteractive ? '2px solid var(--mui-palette-primary-medium)' : undefined,
    },
    ...disabledStyle,
    ...props.sx,
  }

  return (
    <Stack onClick={handleClick} onContextMenu={handleContextMenu} {...props} sx={stackStyles}>
      {children}
      {linkUrl && (
        <Menu
          open={!!contextMenu}
          onClose={handleClose}
          anchorReference='anchorPosition'
          anchorPosition={
            contextMenu ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined
          }
        >
          <MenuItem onClick={handleCopyLink}>Copiar Link</MenuItem>
        </Menu>
      )}
    </Stack>
  )
}
