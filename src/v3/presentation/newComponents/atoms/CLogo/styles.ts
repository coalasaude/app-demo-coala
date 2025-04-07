import { styled } from 'styled-components'

import SymbolLogo from '/public/assets/svg/symbolLogo.svg'
import BrandLogo from '/public/assets/svg/brandLogo.svg'

export const StyledCollapsedLogo = styled(SymbolLogo)<{ color: string; height: number }>`
  height: ${({ height }) => height}px;
  path {
    fill: ${({ color }) => color};
  }
`

export const StyledBrandLogo = styled(BrandLogo)<{ color: string; height: number }>`
  height: ${({ height }) => height}px;
  path {
    fill: ${({ color }) => color};
  }
`
