

import { Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import { StyledWrapper } from './style'


export const PasswordIconButton = ({ onClick }:{ onClick: () => void }) => {

  return (
    <StyledWrapper variant='text' color='primary' onClick={() => onClick()}>
      <LockOutlinedIcon />
      <Typography color='primary' variant='h6'>Senha</Typography>
    </StyledWrapper>
  )
}
