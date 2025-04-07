import { styled } from '@mui/material/styles'

import { spacing } from '@/v3/presentation/utils/spacing'

export const StyledQuizBody = styled('div')`
  padding: ${spacing(1)};
`

export const StyledQuizInfoContainer = styled('div')`
  display: flex;
  flex-direction: column;
  padding: ${spacing(1)};
  gap: ${spacing(1)};
`

export const StyledQuizInfoItem = styled('div')`
  display: flex;
  padding: 0 ${spacing(2)};
  gap: ${spacing(1)};
`

export const StyledHighlightedText = styled('span')`
  font-weight: bold;
  color: var(--mui-palette-primary-main);
  margin-left: ${spacing(2)};
  margin-bottom: ${spacing(2)};
`

export const StyledButtonContainer = styled('div')`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  padding: ${spacing(1)} 0;
  margin: ${spacing(1)};
  gap: ${spacing(1)};
`

export const StyledFooterText = styled('div')`
  margin-left: ${spacing(2)};
  font-size: 16px;
`
