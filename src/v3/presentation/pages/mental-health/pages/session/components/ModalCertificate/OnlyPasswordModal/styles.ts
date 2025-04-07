import { Dialog } from '@mui/material'
import styled from 'styled-components'
import CloseIcon from '@mui/icons-material/Close'

import { spacing } from '@/v3/presentation/utils/spacing'

export const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    width: 95%;
    max-width: 400px;
  }

  h1 {
    font-size: 20px;
    font-weight: 700;
    padding: ${spacing(4)};
  }
`

export const StyledCloseIcon = styled(CloseIcon)`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
`

export const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: ${spacing(2)};
  padding: ${spacing(2)} ${spacing(3)} ${spacing(3)} ${spacing(3)};
`

export const StyledInputWrapper = styled.div`
  padding: 0 32px 16px 32px;
`
