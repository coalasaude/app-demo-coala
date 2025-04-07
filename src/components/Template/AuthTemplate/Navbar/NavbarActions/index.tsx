import { Box } from '@mui/material'
import React, { ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'

export const NavbarActions = ({
  children,
  forceReturnChildren,
}: {
  children: React.ReactNode
  forceReturnChildren?: boolean
}) => {
  useEffect(() => {
    if (children) {
      const container = document.getElementById('container')
      if (container) container.classList.add('with-actions')
      const intercom = document.getElementsByClassName('intercom-lightweight-app-launcher')
      if (intercom?.length) intercom[0].classList.add('with-actions')
    }

    return () => {
      const container = document.getElementById('container')
      if (container) container.classList.remove('with-actions')
      const intercom = document.getElementsByClassName('intercom-lightweight-app-launcher')
      if (intercom?.length) intercom[0].classList.remove('with-actions')
    }
  }, [children])

  const element = document.getElementById('navbar-actions')
  if (element) {
    return createPortal(<Box m={1}>{children}</Box>, element) as ReactNode
  }

  return forceReturnChildren ? children : null
}

export default NavbarActions
