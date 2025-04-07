import { Typography } from '@mui/material'
import styled from 'styled-components'

export const Container = styled.div<{ clickable: boolean }>`
  display: flex;
  flex-direction: column;

  ${({ clickable }) =>
    clickable &&
    `
      cursor: pointer;
      :active {
        opacity: 0.7;
      }
  `}
`

export const TextLabel = styled(Typography).attrs({
  variant: 'h5',
  color: 'var(--mui-palette-grey-500)',
  fontWeight: 400,
})``

export const TextValue = styled(Typography).attrs({ variant: 'body1' })`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
