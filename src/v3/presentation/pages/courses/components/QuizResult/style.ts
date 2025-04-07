import { styled } from '@mui/material/styles'
import { Typography } from '@mui/material'

import { spacing } from '@/v3/presentation/utils/spacing'

export const StyledQuizResultContainer = styled('div')`
  margin: ${spacing(1)};
  display: flex;
  gap: ${spacing(1)};
  flex-direction: column;
`

export const ResultTypography = styled(Typography)`
  padding: 0 0 ${spacing(1)} ${spacing(1)};
`

export const StyledQuizScoreContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: ${spacing(1)};
  margin-bottom: ${spacing(2)};
`

export const StyledQuizScore = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${spacing(1)};
  padding-left: ${spacing(2)};
`

export const StyledQuizScoreText = styled(Typography)`
  font-size: 12px;
  font-weight: 700;
`

export const StyledQuizScoreValueContainer = styled('div')<{ isErros: boolean }>`
  border-radius: ${spacing(2)};
  background-color: ${(props) => (props.isErros ? '#FFEAED' : '#E3F6EC')};
  padding: ${spacing(1)} ${spacing(2)};
  color: ${(props) => (props.isErros ? 'var(--mui-palette-error-main)' : '#03BE7F')};
`
