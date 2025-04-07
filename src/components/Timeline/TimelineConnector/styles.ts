import styled from 'styled-components'

export const TimelineConnector = styled.div<{ last?: boolean }>`
  margin-top: 8px;
  width: 3px;
  flex-grow: 0.7;
  background: var(--mui-palette-grey-400);

  ${({ last }) =>
    last &&
    `
    background: var(--mui-palette-primary-light);
    display: none;
  `}
`
