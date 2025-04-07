import React from 'react'
import { Box } from '@mui/material'

import ChartsCard from '@/components/Template/AuthTemplate/Charts/ChartsCard'
import { Image } from '@/v3/domain/Image'
import { NotFound } from '@/v3/presentation/components/NotFound'

import PersonLoad from './PersonLoad'

export type PersonType = {
  id: number
  name: string
  profile: string
  number: number
  image?: Image
}[]

type Props = {
  title: string
  person: PersonType
}

export const Ranking = ({ title, person }: Props) => {
  return (
    <ChartsCard title={title} style={{ display: 'flex' }}>
      <Box height='100%'>
        {Boolean(person.length > 0) ? (
          <PersonLoad person={person?.slice(0, 3)} />
        ) : (
          <Box mt={2}>
            <NotFound text='Não encontramos nenhum paciente' />
          </Box>
        )}
      </Box>
    </ChartsCard>
  )
}

export default Ranking
