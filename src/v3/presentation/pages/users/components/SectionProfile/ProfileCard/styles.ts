import styled from 'styled-components'

export const StyledHealthLeader = styled.div`
  background: var(--mui-palette-background-default);
  border-radius: 8px;
  height: 70%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div {
    padding: 8px;
    display: flex;
    align-items: center;
  }

  & > svg {
    margin-right: 8px;
    max-height: 50px;
    max-width: 50px;
    height: 70%;
    width: 100%;
  }
`
