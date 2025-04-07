import React, { useState } from 'react'
import { OpenInNew } from '@mui/icons-material'
import { Box } from '@mui/material'

import ChartsCard from '@/components/Template/AuthTemplate/Charts/ChartsCard'
import { NotFound } from '@/v3/presentation/components/NotFound'

import PersonCourse from '../../PersonCourse'
import { PersonCourseType } from '../../PersonCourse/type'

import RankingCourseModal from './modal/RankingCourseModal'

type Props = {
  title: string
  subtitle: string
  person: PersonCourseType
}

export const RankingCourseContent = ({ title, person, subtitle }: Props) => {
  const [open, setOpen] = useState(false)

  const handleClickToggle = () => {
    setOpen((prev) => !prev)
  }

  return (
    <>
      <ChartsCard title={title} subtitle={subtitle} Icon={OpenInNew} onClick={handleClickToggle}>
        {Boolean(person.length > 0) ? (
          <PersonCourse person={person.slice(0, 3)} />
        ) : (
          <Box mt={2}>
            <NotFound text='Não encontramos nenhum curso para esta instituição' />
          </Box>
        )}
      </ChartsCard>
      <RankingCourseModal onClose={handleClickToggle} person={person} open={open} />
    </>
  )
}

export default RankingCourseContent
