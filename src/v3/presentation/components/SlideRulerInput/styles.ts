import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledInput = styled('input')`
  border-radius: ${({ theme }) => theme.spacing(0.5)};
  border: 2px solid var(--mui-palette-grey-200);
  padding: ${({ theme }) => theme.spacing(1)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  font-size: ${({ theme }) => theme.spacing(4)};
  font-weight: bold;
  text-align: center;
  line-height: 1.5;
  color: var(--mui-palette-gray_700);
  height: ${({ theme }) => theme.spacing(7)};
  width: 100%;
  outline: none;
  box-sizing: border-box;
  padding-right: ${({ theme }) => theme.spacing(4)};

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }

  &:focus {
    border: 2px solid var(--mui-palette-primary-dark);
  }
`

export const UnitLabel = styled(Typography)`
  position: absolute;
  right: 10px;
  top: 12px;
  bottom: 0;
  pointer-events: none;
`
