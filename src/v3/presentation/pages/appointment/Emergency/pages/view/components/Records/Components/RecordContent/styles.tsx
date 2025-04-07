import { Box, Stack, StackProps } from '@mui/material'
import { styled, css } from '@mui/material/styles'

interface StyledContainerProps extends StackProps {
  isActive: boolean
  isResumeVideoLog?: boolean
}

export const StyledContainer = styled((props: StyledContainerProps) => <Stack {...props} />)`
  padding: ${({ theme }) => theme.spacing(2)};
  flex: 1;
  border-radius: ${({ theme }) => theme.spacing(1)};
  gap: ${({ theme }) => theme.spacing(2)};
  background: ${({ theme, isResumeVideoLog }) =>
    isResumeVideoLog ? '#fff' : theme.palette.background.default};
  overflow: auto;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.palette.grey[300]};
    border-radius: 5px;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding-bottom: ${({ theme }) => theme.spacing(20)};
    background: #ffffff;
  }

  ${({ theme, isActive }) =>
    !isActive &&
    css`
      & * {
        color: ${theme.palette.grey[400]} !important;
      }
    `}
`

export const StyledButtonsContainer = styled(Stack)`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing(2)};

  ${({ theme }) => theme.breakpoints.down('sm')} {
    position: fixed;
    bottom: 0;
    z-index: 99;
    width: 100%;

    align-items: center;
    justify-content: center;

    background: #ffffff;
    padding: ${({ theme }) => theme.spacing(2)};
    padding-bottom: ${({ theme }) => theme.spacing(5)};
    margin-left: -${({ theme }) => theme.spacing(2)};

    box-shadow: 0px 0px 8px 0px #00000014;
  }
`

export const StyledCloseContainer = styled(Box)`
  position: absolute;
  z-index: 99;
  top: 0;
  right: 0;
  padding: ${({ theme }) => theme.spacing(1.5)} 0;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    display: none;
  }
`
