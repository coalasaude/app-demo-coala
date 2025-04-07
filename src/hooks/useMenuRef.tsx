import { useState } from 'react'

export function useMenuRef<T extends HTMLElement | SVGElement>() {
  const [anchorEl, setAnchorEl] = useState<null | T | HTMLButtonElement>(null)
  const handleClick = (event: React.MouseEvent<T | HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return {
    anchorEl,
    setAnchorEl,
    handleClick,
    handleClose,
  }
}
