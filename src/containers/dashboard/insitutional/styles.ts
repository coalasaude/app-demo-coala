import styled from 'styled-components'

import { spacing } from '@/utils/spacing'

export const DashboardContent = styled.div`
  background: white;
  box-shadow: rgb(0 0 0 / 8%) 0px 0px 10px;
  padding: ${spacing(1)} ${spacing(2)};
  margin: ${spacing(1)} 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  text-align: start;
  position: relative;
  color: var(--mui-palette-grey-700);

  & .recharts-wrapper {
    width: 100% !important;
    height: 250px;

    & > svg {
      width: 100%;
    }
  }

  & .recharts-legend-wrapper {
    width: 100% !important;
  }

  & .recharts-tooltip-wrapper {
    z-index: 1500;
  }

  h6 {
    width: 100%;
    margin-bottom: ${spacing(2)};
    color: var(--mui-palette-grey-800);
    font-size: 1rem;
  }
`
