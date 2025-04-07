import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React from 'react'

import { UserDataProvider } from '@/components/UserDataProvider'
import { AuthProvider } from '@/context/AuthProvider'
import { LayoutProvider } from '@/context/LayoutProvider'
import { MetaPixelProvider } from '@/context/MetaPixelProvider'
import { ParamsProvider } from '@/context/ParamsProvider'
import { RequestProvider } from '@/context/RequestProvider'
import { theme } from '@/theme'

function Providers({ children }: { children: React.ReactNode; isMobile: boolean }) {
  return (
    <CssVarsProvider theme={theme as any}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
        <AuthProvider>
          <RequestProvider>
            <LayoutProvider>
              <ParamsProvider>
                <UserDataProvider>
                  <MetaPixelProvider>{children}</MetaPixelProvider>
                </UserDataProvider>
              </ParamsProvider>
            </LayoutProvider>
          </RequestProvider>
        </AuthProvider>
      </LocalizationProvider>
    </CssVarsProvider>
  )
}

export default Providers
