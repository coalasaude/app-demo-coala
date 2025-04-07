import { styled } from '@mui/material/styles'

import { spacing } from '@/v3/presentation/utils/spacing'
import { Paper } from '@/v3/presentation/components/Paper'

export const StyledClassWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${spacing(2)};
`

export const StyledVideoWrapper = styled('div')`
  padding: 56.25% 0 0 0;
  position: relative;
`

export const StyledClassContainer = styled(Paper)`
  width: 100%;
  padding: ${spacing(1)};

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`

export const StyledClassTitle = styled('div')`
  display: flex;
  flex-direction: column;
  gap: ${spacing(1)};
  margin-bottom: ${spacing(1)};
`

export const StyledClassDescription = styled('div')`
  font-size: 14px;
`

export const StyledClassWrapperUtils = styled('div')`
  display: flex;
  flex-direction: column;
  gap: ${spacing(1)};
  padding: ${spacing(1)};
  margin-top: ${spacing(1)};

  p {
    padding: ${spacing(1)} 0 ${spacing(1)} ${spacing(2)};
    margin: 0;
  }
`

export const StyledClassDescriptionWrapper = styled('div')`
  padding: ${spacing(1)};
`

export const StyledFileLink = styled('a')`
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--mui-palette-info-main);
`
