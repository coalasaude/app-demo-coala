import styled from 'styled-components'
import { Box } from '@mui/material'

import Paper from '../Paper'
import { spacing } from '../../utils/spacing'

export const MODAL_Z_INDEX = 1300

export const StyledIcon = styled.div`
  svg {
    font-size: 40px;
    color: var(--mui-palette-primary-main);
  }
`

export const StyledCloseButton = styled.div`
  cursor: pointer;
  position: absolute;
  right: ${spacing(3)};
  top: ${spacing(3)};

  svg {
    font-size: 24px;
  }
`

export const StyledModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${spacing(3)};
`

export const StyledModalContent = styled(Box)``

export const StyledModalCard = styled(Paper) <{ isMobile: boolean; isQuiet?: boolean }>`
  border: none;
  padding: ${spacing(3)};
  width: ${({ isMobile }) => (isMobile ? spacing(48) : spacing(64))};
  position: relative;
  ${({ isQuiet, isMobile }) =>
    isQuiet && !isMobile && `box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.24);`}
`

export const StyledModal = styled.dialog`
  align-items: center;
  backdrop-filter: blur(4px);
  background-blend-mode: hard-light;
  background-color: rgba(91, 91, 91, 0.5);
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: ${MODAL_Z_INDEX};
  border-width: 0;
`

export const StyledQuietModal = styled.div<{ isMobile?: boolean }>`
  ${({ isMobile }) =>
    !isMobile &&
    `
    bottom: ${spacing(5)};
    position: fixed;
    right: ${spacing(4)};
    z-index: ${MODAL_Z_INDEX};
  `}

  ${({ isMobile }) =>
    isMobile &&
    `
    bottom: ${'100%'};
    position: absolute;
    right: ${spacing(0)};
    z-index: ${MODAL_Z_INDEX};
  `}
`
