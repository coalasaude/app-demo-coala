import styled from '@mui/styled-engine'
import { Box } from '@mui/material'

import { spacing } from '@/utils/spacing'

export const Content = styled(Box)<{ withHover?: boolean; color?: string }>`
  background: ${(box) => (box.color ? box.color : 'white')};
  position: relative;
  padding: ${spacing(2)};
  margin: ${spacing(2)} 0;
  width: 100%;
  border-radius: 15px;
  ${({ withHover }) =>
    withHover &&
    `
    transition: all .1s ease;
    border: 2px solid var(--mui-palette-grey-200);
    &:hover {
      border: 2px solid var(--mui-palette-primary-main)
    };
  `};
`
