import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'

import { capitalizeName } from '@/utils/capitalizeName'
import { CAvatar } from '@/v3/presentation/newComponents'
import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'

import { PersonType } from '..'

import StyledContainer from './styles'

type Props = {
  person: PersonType | null
}
export const PersonLoad = ({ person }: Props) => {
  const router = useRouter()
  const handleClick = (id: number) => {
    router.push(
      bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.VIEW.path, {
        userId: String(id),
      }),
    )
  }

  return (
    <Box mt={2}>
      {person?.map(({ name, number, profile, id }) => {
        const userName = name !== 'undefined undefined' ? capitalizeName(name) : 'Não Definido'
        const profileName = !!profile ? profile : 'Não definido'
        let fullName = userName

        if (fullName.length > 20) {
          fullName = `${userName.slice(0, 24)}...`
        }

        return (
          <StyledContainer
            key={name}
            mb={2}
            onClick={() => handleClick(id)}
            sx={{ cursor: 'pointer' }}
          >
            <Grid container>
              <Grid item xs={10}>
                <Box display='flex' alignItems='center'>
                  <CAvatar name={userName} size='large' type='initials' />
                  <Box
                    display='flex'
                    justifyContent='center'
                    height='100%'
                    flexDirection='column'
                    ml={2}
                  >
                    <Typography variant='h5'>{fullName}</Typography>
                    <Typography variant='body2' color='var(--mui-palette-grey-700)'>
                      {profileName}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Box display='flex' alignItems='center' justifyContent='center' height='100%'>
                  <Typography variant='h5' color='primary'>
                    {number}
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

export default PersonLoad
