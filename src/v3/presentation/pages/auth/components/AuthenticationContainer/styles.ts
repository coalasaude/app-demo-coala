import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

export const LoginContainer = styled(Box)`
  height: 100%;
  min-height: 100vh;
  display: flex;
  overflow: hidden;
  background: white;
`

export const LoginImageWrapper = styled(Box)`
  width: 50%;
  position: relative;
  height: 100%;
  min-height: 100vh;
  max-width: 50%;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 0;
    height: 0;
    min-height: 0;
  }
`

export const FormWrapper = styled(Box)`
  width: 50%;
  padding: ${({ theme }) => theme.spacing(4)};
  margin: auto 0;
  overflow: auto;
  max-height: 100vh;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 100%;
  }
`

export const FormContent = styled(Box)`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.spacing(54)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`
