import styled from 'styled-components'
import Image from 'next/legacy/image'

import { spacing } from '@/utils/spacing'

export const StyleInfoProfile = styled.div`
  display: flex;
  margin: ${spacing(1)} 0;
`

export const StyleProfilePicture = styled(Image)`
  width: 44px !important;
  height: 44px !important;
  border-radius: 50%;
`

export const StyledProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing(0.5)};
  h1 {
    font-size: 16px;
    font-weight: 700;
    margin: 0;
  }
  h2 {
    font-size: 12px;
    font-weight: 400;
    margin: 0;
  }
`
