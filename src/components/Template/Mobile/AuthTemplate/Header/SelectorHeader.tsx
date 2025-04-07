import { Box, Typography } from '@mui/material'

import { HeaderContent, HeaderWrapper } from '@/components/Template/Mobile/AuthTemplate/Header'

import HeaderSubtitle from './HeaderSubtitle'

export const SelectorHeader = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <HeaderWrapper>
      <HeaderContent>
        <Box px={1}>
          <Typography display='block' variant='h3' noWrap>
            {title}
          </Typography>
          <HeaderSubtitle subtitle={subtitle} text={subtitle} />
        </Box>
      </HeaderContent>
    </HeaderWrapper>
  )
}

export default SelectorHeader
