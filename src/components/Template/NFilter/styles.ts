import styled from 'styled-components'

import { spacing } from '@/utils/spacing'

export const NFilterContainer = styled.div<{ align?: 'left' | 'right' }>`
  background: white;
  border-radius: 5px;
  min-height: 40px;
  min-width: 300px;
  max-width: 400px;
  position: absolute;
  z-index: 1199;
  box-shadow: 0px 0px 2px -1px black, 0px 0px 4px -3px black;
  margin-top: 8px;
  ${({ align }) => (align === 'right' ? 'right: 0;' : null)}
`

export const NFilterContent = styled.div<{ isActive?: boolean }>`
  color: var(--mui-palette-grey-700);
  font-weight: 600;
  border-bottom: 1px solid var(--mui-palette-grey-200);
  padding-bottom: ${spacing(1)};
  margin-bottom: 8px;
  display: flex;
  transition: color 0.1s ease;
  cursor: pointer;

  ${({ isActive }) => isActive && `color: black;`}
`
