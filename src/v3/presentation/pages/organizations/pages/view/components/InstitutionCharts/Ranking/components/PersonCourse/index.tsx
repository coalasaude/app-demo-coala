import { Box, Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'

import { NEW_ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'
import { capitalizeName } from '@/utils/capitalizeName'
import { CAvatar } from '@/v3/presentation/newComponents'
import { CTooltipText } from '@/v3/presentation/newComponents/molecules/CTooltipText'

import StyledContainer from './styles'
import { PersonCourseType, PersonTypeStatus } from './type'
import { formatStatusColor } from './utils/formatStatusColor'

type Props = {
  person: PersonCourseType | null
}

export const PersonCourse = ({ person }: Props) => {
  const router = useRouter()

  return (
    <Box pt={2}>
      {person?.map(({ name, status, profile, id }, index) => {
        const fullName = name !== 'undefined undefined' ? capitalizeName(name) : 'Não Definido'
        const profileName = !!profile ? profile : 'Não definido'
        const formatStatus = !!status ? status : PersonTypeStatus.NOT_STARTED
        const typeColor = formatStatusColor(formatStatus)
        const handleClick = () => {
          router.push(bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.VIEW.path, { userId: id }))
        }

        return (
          <StyledContainer
            key={name}
            mb={index === person.length - 1 ? 0 : 2}
            onClick={handleClick}
          >
            <Grid container>
              <Grid item xs={9}>
                <Box display='flex' alignItems='center'>
                  <CAvatar name={fullName} size='large' type='initials' />
                  <Box
                    display='flex'
                    justifyContent='center'
                    height='100%'
                    flexDirection='column'
                    ml={2}
                  >
                    <CTooltipText>
                      <Typography
                        variant='h5'
                        whiteSpace={'pre-line'}
                        fontSize={12}
                        overflow='hidden'
                        textOverflow='ellipsis'
                        display='-webkit-box'
                        sx={{ WebkitLineClamp: [1], WebkitBoxOrient: 'vertical' }}
                        pr={1}
                      >
                        {fullName}
                      </Typography>
                    </CTooltipText>
                    <Typography variant='body2' color='var(--mui-palette-grey-700)'>
                      {profileName}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box display='flex' alignItems='center' justifyContent='center' height='100%'>
                  <Typography variant='h5' color={typeColor} whiteSpace={'nowrap'}>
                    {formatStatus}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </StyledContainer>
        )
      })}
    </Box>
  )
}

export default PersonCourse
