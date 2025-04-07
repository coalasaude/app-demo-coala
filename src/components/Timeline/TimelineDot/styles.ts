import styled from 'styled-components'

export const TimelineDotContainer = styled.div<{ isFinished?: boolean }>`
  width: 30px;
  height: 30px;
  border: 2px solid var(--mui-palette-grey-400);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--mui-palette-grey-400);
  border-color: var(--mui-palette-grey-400);

  ${({ isFinished }) =>
    isFinished &&
    `
    background: var(--mui-palette-primary-main);
    border-color: var(--mui-palette-primary-main);
  `}
`
