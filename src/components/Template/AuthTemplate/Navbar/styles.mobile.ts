import { styled } from '@mui/material/styles'

export const MobileNavbar = styled('div')`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  background: white;
  min-height: 75px;
  z-index: 1200;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0px 0px 4px 0px ${({ theme }) => theme.palette.grey[100]},
    0px 0px 4px 0px ${({ theme }) => theme.palette.grey[100]};
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`
