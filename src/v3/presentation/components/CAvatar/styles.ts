import { CorporateFare, Edit } from '@mui/icons-material'
import { Box, BoxProps } from '@mui/material'
import styled from 'styled-components'

import Avatar from '/public/assets/svg/Account_circle.svg'

interface RoundedContainerProps extends BoxProps {
  canEdit?: boolean
}

export const RoundedContainer = styled(Box)<RoundedContainerProps>`
  position: relative;
  border-radius: 50%;

  cursor: ${({ canEdit }) => (canEdit ? 'pointer' : 'default')};

  width: ${({ width }) => (width ? `${width as string}px` : '44px')};
  height: ${({ height }) => (height ? `${height as string}px` : '44px')};
`

export const BasicRoundContainer = styled(Box)`
  position: relative;
  border-radius: 50%;

  width: ${({ width }) => (width ? `${width as string}px` : '44px')};
  height: ${({ height }) => (height ? `${height as string}px` : '44px')};
`

export const CoalaAvatar = styled(Avatar)`
  height: 100%;
  width: 100%;
`

export const OrganizationAvatar = styled(CorporateFare)`
  width: 70% !important;
  height: 70% !important;

  color: var(--mui-palette-grey-300);
`

export const EditButtonContainer = styled(Box)`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 16px;
  height: 16px;

  background: var(--mui-palette-grey-200);
  border-radius: 50%;
`

export const EditButton = styled(Edit).attrs({ sx: { fontSize: '10px' } })``
