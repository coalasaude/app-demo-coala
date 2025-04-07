import { Box, Divider } from '@mui/material'

import { Experimental_CTicket } from '@/v3/presentation/newComponents/molecules/Experimental_CTicket'

import { StyledContainer } from './styles'

export interface CTicketGroupProps {
  children: React.ReactElement<typeof Experimental_CTicket>[]
}

export const CTicketGroup: React.FC<CTicketGroupProps> = ({ children }) => {
  return (
    <StyledContainer>
      {children.map((child, index) => {
        return (
          <Box key={index}>
            {child}
            <Divider sx={{ mt: 1 }} />
          </Box>
        )
      })}
    </StyledContainer>
  )
}
