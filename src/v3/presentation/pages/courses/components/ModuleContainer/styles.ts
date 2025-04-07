import { styled } from '@mui/material/styles'

import Paper from '@/v3/presentation/components/Paper'
import { spacing } from '@/v3/presentation/utils/spacing'

export const ModuleContainerWrapper = styled(Paper)`
  padding: ${spacing(1)};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: ${spacing(1)};

  h1 {
    font-size: 1.375rem;
    margin: ${spacing(1)};
  }
`

export const StyledWrapperTitleIcon = styled('div')`
  display: flex;
  font-size: 16px;
  color: var(--mui-palette-grey-700);
  padding: ${spacing(1)};
  align-items: center;
  gap: ${spacing(1)};

  svg {
    width: 12px;
    height: 12px;
    color: var(--mui-palette-grey-700);
  }
`
