import React, { createContext, useState } from 'react'
import { AlertColor, Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert'

import useMediaQuery from '@/hooks/useMediaQuery'

interface LayoutProps {
  message?: string | JSX.Element
  type: AlertColor
  opened?: boolean
}
export type TSnackbar = (props: LayoutProps) => void
interface ILayoutContext {
  showSnackBar(props: LayoutProps): void
}
export const LayoutContext = createContext<ILayoutContext>({} as ILayoutContext)

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [snackBar, setSnackBar] = useState<LayoutProps>({} as LayoutProps)
  const isSmallDevice = useMediaQuery('sm')
  const showSnackBar = (props: LayoutProps) =>
    setSnackBar({
      ...props,
      opened: true,
    })

  const onClose = () => {
    setSnackBar(
      (prevState) =>
        ({
          ...prevState,
          opened: false,
        } as LayoutProps)
    )
  }

  return (
    <LayoutContext.Provider value={{ showSnackBar }}>
      <Snackbar
        open={Boolean(snackBar && snackBar.opened)}
        autoHideDuration={6000}
        onClose={onClose}
        sx={{ zIndex: 3000 }}
        anchorOrigin={{ vertical: 'bottom', horizontal: isSmallDevice ? 'left' : 'right' }}
      >
        <MuiAlert onClose={onClose} severity={snackBar.type} variant='filled'>
          {snackBar?.message || ''}
        </MuiAlert>
      </Snackbar>
      {children}
    </LayoutContext.Provider>
  )
}
