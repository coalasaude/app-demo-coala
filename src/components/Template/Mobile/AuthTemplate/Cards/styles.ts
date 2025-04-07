import { Box } from '@mui/material'
import styled from 'styled-components'

import { spacing } from '@/utils/spacing'

export const StyledCard = styled(Box)`
  padding: 16px 32px;
  background: white;
  min-height: 80px;
  width: 100%;
  margin: 0 auto;
  border-radius: 14px;
  margin-top: 16px;
  position: relative;

  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.03);
  border: 1px solid var(--mui-palette-grey-300);

  &:first-of-type {
    margin-top: 0px;
  }

  div {
    b {
      font-size: 0.9rem;
      color: black;
    }

    small {
      display: flex;
      gap: ${spacing(0.5)};
      color: var(--mui-palette-grey-700);
      margin-top: 10px;

      svg {
        margin-top: 3px;
      }
    }

    p {
      color: var(--mui-palette-grey-700);
      margin-top: 7px;
    }
  }
`
