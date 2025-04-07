import { Box } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'

import {
  UserAvatar,
  UserAvatarTitle,
  UserAvatarWrapper,
} from '@/v3/presentation/components/Ticket/UserAvatar'
import { Genre } from '@/types/genre'
import { MentalHealthSchedule } from '@/v3/domain/MentalHealth'
import { GridItem, GridWrapper } from '@/components/Grid'
import { MobileDivider } from '@/v3/presentation/pages/appointment/Emergency/pages/view/components/Ticket/components/UserData/styles'

import { StyleInfoProfile } from './styles'
import {
  StyledCalendarContainer,
  StyledCalendarInfo,
  StyledProfessionalContainer,
  StyledProfessionalInfo,
} from './components/SessionInfo/styles'

export const InfoProfile = ({
  fullname,
  age,
  genre,
  session,
}: {
  fullname?: string
  age?: number
  genre?: Genre
  session: MentalHealthSchedule
}) => {
  return (
    <StyleInfoProfile>
      <GridWrapper alignItems='center' spacing={0}>
        <GridItem xs={12} md={4}>
          <UserAvatarWrapper>
            <UserAvatar />
            <Box ml={2}>
              <UserAvatarTitle>{fullname}</UserAvatarTitle>
              {!!genre && !!age && (
                <small>
                  {genre} - {age} anos{' '}
                </small>
              )}
            </Box>
          </UserAvatarWrapper>
          <MobileDivider sx={{ mb: 2 }} />
        </GridItem>
        <GridItem xs={6} md={4}>
          <StyledCalendarInfo>
            <CalendarMonthIcon />
            <StyledCalendarContainer>
              <span>{session?.getFormattedDateFromStartTime()}</span>
              <span>{session?.getStartToEndTimeRange()}</span>
            </StyledCalendarContainer>
          </StyledCalendarInfo>
        </GridItem>
        <GridItem xs={6} md={4}>
          <StyledProfessionalInfo>
            <AccountCircleOutlinedIcon />
            <StyledProfessionalContainer>
              <span>Profissional</span>
              <span className='name'>{session.professional?.getFormattedName()}</span>
            </StyledProfessionalContainer>
          </StyledProfessionalInfo>
        </GridItem>
      </GridWrapper>
    </StyleInfoProfile>
  )
}
