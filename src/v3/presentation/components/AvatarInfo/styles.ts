import Image from 'next/legacy/image'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import Avatar from '/public/assets/svg/avatar_coala.svg'

export const InfoContainer = styled(Box)<{ hideText: boolean }>`
  display: flex;
  align-items: center;
  overflow: ${({ hideText }) => (hideText ? 'unset' : 'hidden')};
`

export const ImageContainer = styled(Box)<{ haveImageComponent?: boolean }>`
  border-radius: 50%;
  margin-right: ${({ theme }) => theme.spacing(1)};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StyledImage = styled(Image)<{ isEdit?: boolean }>`
  max-width: 100%;
  max-height: 100%;
  display: block;
  border-radius: 50%;
  cursor: ${(props) => (props.isEdit ? 'pointer' : 'default')};
`

export const MainText = styled(Typography)``

export const SubText = styled(Typography)``

export const FullWidthAvatar = styled(Avatar)`
  width: 100%;
  height: 100%;
`
