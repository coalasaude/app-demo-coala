import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { Box, Button } from '@mui/material'

import { CForm } from '@/components/Forms'
import ContentWrapper from '@/v3/presentation/components/layout/ContentWrapper'

import { arrWeekday } from '../../constants/arrWeekday'
import ContentCardSchedule from '../ContentCardSchedule'
import { useMySchedule } from '../../hooks/useMySchedule'
import { MyScheduleObject, useMyScheduleContext } from '../../contexts/my-schedule.provider'

import {
  StyledButtonWrapper,
  StyledCardListWrapper,
  StyledMyScheduleTitle,
  StyledMyScheduleWrapper,
} from './styles'

const defaultValues = {
  SEGUNDA: [],
  TERCA: [],
  QUARTA: [],
  QUINTA: [],
  SEXTA: [],
}

export default function MySchedule() {
  const { mySchedule } = useMyScheduleContext()
  const { handleSubmit, submittingError } = useMySchedule()
  const form = useForm<MyScheduleObject>({
    defaultValues,
  })

  useEffect(() => {
    form.reset(mySchedule)
  }, [mySchedule, form])

  return (
    <StyledMyScheduleWrapper>
      <ContentWrapper>
        <StyledMyScheduleTitle>Meus horários disponíveis</StyledMyScheduleTitle>
        <StyledCardListWrapper>
          <CForm form={form} onSubmit={handleSubmit}>
            {arrWeekday.map((weekday) => (
              <Box mb={2} key={weekday}>
                <ContentCardSchedule title={weekday} errors={submittingError} />
              </Box>
            ))}
          </CForm>
        </StyledCardListWrapper>
        <StyledButtonWrapper>
          <Button variant='contained' fullWidth onClick={form.handleSubmit(handleSubmit)}>
            Salvar
          </Button>
          <Button variant='outlined' fullWidth>
            Cancelar
          </Button>
        </StyledButtonWrapper>
      </ContentWrapper>
    </StyledMyScheduleWrapper>
  )
}
