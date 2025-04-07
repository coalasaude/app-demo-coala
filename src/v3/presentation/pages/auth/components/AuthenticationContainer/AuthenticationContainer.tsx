import { Box, Skeleton } from '@mui/material'
import React, { useState } from 'react'
import Image from 'next/image'

import Logo from '/public/assets/svg/LogoLogin.svg'

import { FormContent, FormWrapper, LoginContainer, LoginImageWrapper } from './styles'

export const AuthenticationContainer = ({
  children,
  isLoading,
}: {
  children: React.ReactNode
  isLoading?: boolean
}) => {
  const [render, setRender] = useState(false)

  return (
    <LoginContainer>
      <LoginImageWrapper visibility={render ? 'visible' : 'hidden'}>
        <Image
          src='/login.png'
          objectFit='cover'
          alt='Imagem de login'
          layout='fill'
          priority
          onLoadingComplete={() => setRender(true)}
        />
      </LoginImageWrapper>
      <FormWrapper>
        <FormContent>
          {render && (
            <>
              <Box mb={6}>
                <Logo style={{ maxWidth: 125 }} />
              </Box>
              {isLoading ? (
                <>
                  <Skeleton variant='text' width='100%' height={150} sx={{ mt: -4, mb: -1 }} />
                  <Skeleton variant='text' width='100%' height={70} />
                  <Skeleton variant='text' width='100%' height={70} sx={{ mt: -1 }} />
                </>
              ) : (
                <Box minHeight={265}>{children}</Box>
              )}
            </>
          )}
        </FormContent>
      </FormWrapper>
    </LoginContainer>
  )
}
