import { styled } from '@mui/material/styles'

import { NavBarHeight } from '@/components/Template/AuthTemplate/Navbar/styles'

export const CContainer = styled('div') <{
  disablePadding?: boolean
}>`
  background: ${({ theme }) => theme.palette.background.default};
  z-index: 1600;
  min-height: 100vh;
  height: ${({ disablePadding }) => (disablePadding ? '90vh' : 'unset')};
  max-width: ${({ disablePadding }) => (disablePadding ? 'auto' : '1550px')};
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 100%;
    margin-left: 0;
    padding-bottom: ${({ theme }) => `calc(${NavBarHeight} + ${theme.spacing(2)})`};
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    gap: ${({ theme }) => theme.spacing(2)};

    &.with-actions {
      padding-bottom: ${({ theme }) => `calc(${NavBarHeight} + ${theme.spacing(10)})`};
    }
  }
`
