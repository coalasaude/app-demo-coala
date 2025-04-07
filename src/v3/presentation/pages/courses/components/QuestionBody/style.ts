import { styled } from '@mui/material/styles'

import { spacing } from '@/v3/presentation/utils/spacing'

export const StyledQuestionBodyWrapper = styled('div')`
  padding: ${(spacing(2), spacing(1))};
`

export const StyledAnswerWrapper = styled('div')`
  margin-top: ${spacing(2)};
  display: flex;
  flex-direction: column;
`

export const StyledResponseAnswerContainer = styled('div')<{ isCorrect: boolean }>`
  background-color: ${({ isCorrect }) =>
    isCorrect ? 'var(--mui-palette-success-light)' : 'var(--mui-palette-error-light)'};
  padding: ${spacing(1)};
  margin-top: ${spacing(4)};
  margin-bottom: ${spacing(2)};
`

export const StyledResponseAnswerTitle = styled('div')`
  display: flex;
  font-weight: 700;
  font-size: 16px;
  color: black;
  gap: ${spacing(1)};
  display: flex;
  align-items: center;
`

export const StyledResponseAnswerText = styled('div')`
  font-size: 14px;
  padding: ${spacing(1)} ${spacing(2)} ${spacing(1)} ${spacing(3)};
`
