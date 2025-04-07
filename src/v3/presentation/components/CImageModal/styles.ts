import styled from 'styled-components'
import { styled as muiStyled } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Dialog } from '@mui/material'

export const InputHidden = styled.input`
  display: none;
`

export const CloseButton = styled(CloseIcon)`
  position: absolute;
  top: 25px;
  right: 25px;

  cursor: pointer;
`

export const StyledDialog = muiStyled(Dialog)`
  ${({ theme }) => theme.breakpoints.down('sm')} {
    .MuiDialog-container {
      align-items: flex-end;
    }

    .MuiPaper-root {
      width: 100%;
      margin: 0;
    }
  }
`

export const ImageContainer = muiStyled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 428px;
  padding: ${({ theme }) => theme.spacing(5)} ${({ theme }) => theme.spacing(4)};

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 100%;
  }
`

export const OptionsContainer = muiStyled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(1)};

  width: 100%;

  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
`

export const Option = muiStyled(Box)`
  width: 100%;

  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(1.5)} 0;

  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[200]};

  &:hover {
    cursor: pointer;
  }

  & > svg {
    color: var(--mui-palette-grey-500);
  }
`

export const WebcamContainer = muiStyled(Box)`
  position: relative;

  width: 444px;
  height: 308px;

  margin: ${({ theme }) => theme.spacing(9)};
`

export const CameraButton = styled(Box)`
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);

  width: 55px;
  height: 55px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--mui-palette-primary-main);
  border-radius: 50%;

  &:hover {
    cursor: pointer;
  }
`

export const Video = styled.video`
  position: absolute;
  width: 444px;
  height: 308px;
  object-fit: cover;
  border-radius: 8px;
`
