import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

export const NavbarActions = ({ children }: { children: React.ReactElement }) => {
  useEffect(() => {
    return () => {
      const container = document.getElementById('container')
      if (container) container.classList.remove('with-actions')
      const intercom = document.getElementsByClassName('intercom-lightweight-app-launcher')
      if (intercom?.length) intercom[0].classList.remove('with-actions')
    }
  }, [])

  if (children) {
    const container = document.getElementById('container')
    if (container) container.classList.add('with-actions')
    const element = document.getElementById('navbar-actions')
    const intercom = document.getElementsByClassName('intercom-lightweight-app-launcher')
    if (intercom?.length) intercom[0].classList.add('with-actions')
    if (element) {
      return createPortal(
        <Box m={1} display='flex'>
          {children}
        </Box>,
        element,
      ) as React.ReactElement
    }
  }
  return children
}

export default NavbarActions
