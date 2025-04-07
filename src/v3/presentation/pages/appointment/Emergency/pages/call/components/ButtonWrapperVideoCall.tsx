import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

export const ButtonWrapperVideoCall = ({ children }: { children: React.ReactElement }) => {
  useEffect(() => {
    return () => {
      const container = document.getElementById('container')
      if (container) container.classList.remove('with-actions')
    }
  }, [])

  if (children) {
    const container = document.getElementById('container')
    if (container) container.classList.add('with-actions')
    const element = document.getElementById('GridVideoViewAddAppointment')
    if (element) {
      return createPortal(
        <Box
          p={1}
          position='absolute'
          width='100%'
          zIndex={10}
          bottom={0}
          sx={{
            backgroundColor: '#fff',
            borderRadius: 2,
            borderTop: '1px solid var(--mui-palette-grey-100)',
            boxShadow: '0px -4px 10px 0px rgba(0, 0, 0, 0.1)',
          }}
        >
          {children}
        </Box>,
        element,
      ) as React.ReactElement
    }
  }
  return children
}

export default ButtonWrapperVideoCall
