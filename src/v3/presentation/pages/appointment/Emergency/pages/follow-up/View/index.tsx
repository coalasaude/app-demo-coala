import React from 'react'
import { Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'

import { CardDescription } from '@/components/Card'
import { useFetchFollowUp } from '@/v3/presentation/hooks/useFetchFollowUp'
import { formatDate } from '@/utils/formatDate'
import {
  MeansContactDescription,
  PatientEvolutionDescription,
  TypeAssistanceDescription,
  UserContactDescription,
  WhoLiberedDescription,
} from '@/constants/followUp'
import { capitalizeName } from '@/utils/capitalizeName'

import { ChipData } from '../../../components/ChipData/ChipData'

import { StyledContainer, StyledContentWrapper } from './styles'

const GridItem = (props: any) => <Grid item xs={12} md={4} {...props} />

export const FollowUpView: React.FC = () => {
  const { query } = useRouter()
  const appointmentData = {} as any
  const { followUpData } = useFetchFollowUp({
    appointmentId: query.id ? Number(query.id) : 0,
    followUpId: query['follow-up-id'] ? Number(query['follow-up-id']) : 0,
  })
  const { data } = followUpData || {}
  const fullName = data?.user_without_access
    ? data?.user_without_access
    : `${capitalizeName(data?.user?.name)} ${capitalizeName(data?.user?.lastname)}`

  return (
    <StyledContainer>
      <ChipData data={appointmentData?.data} />

      <StyledContentWrapper>
        <Typography variant='h5' component='p'>
          Acompanhamento
        </Typography>

        <Grid container spacing={2}>
          <GridItem>
            <CardDescription
              title='Por qual meio o contato foi feito'
              subtitle={MeansContactDescription[data?.means_contact]}
            />
          </GridItem>

          <GridItem>
            <CardDescription
              title='Com quem fez o contato?'
              subtitle={UserContactDescription[data?.user_made_contact]}
            />
          </GridItem>

          <GridItem />

          <GridItem>
            <CardDescription title='Nome' subtitle={fullName} />
          </GridItem>

          <GridItem>
            <CardDescription title='Quem é?' subtitle={data?.who_is} />
          </GridItem>

          <GridItem>
            <CardDescription title='Contato' subtitle={data?.contact_assistance} />
          </GridItem>

          <GridItem>
            <CardDescription
              title='Data desse contato'
              subtitle={data?.date_of_contact ? formatDate(String(data?.date_of_contact)) : ''}
            />
          </GridItem>

          <GridItem>
            <CardDescription
              title='Horário desse contato'
              subtitle={
                data?.time_of_contact ? formatDate(String(data?.time_of_contact), 'HH:MM') : ''
              }
            />
          </GridItem>

          <GridItem>
            <CardDescription
              title='Teve sucesso no contato?*'
              subtitle={data?.successful_contact ? 'Sim' : 'Não'}
            />
          </GridItem>

          <GridItem>
            <CardDescription
              title='Procurou assistência em saúde presencial?*'
              subtitle={data?.face_to_face_assistance ? 'Sim' : 'Não'}
            />
          </GridItem>

          <GridItem>
            <CardDescription
              title='Tipo de assistência presencial'
              subtitle={TypeAssistanceDescription[data?.type_assistance]}
            />
          </GridItem>

          <GridItem />

          <GridItem>
            <CardDescription title='Nome do hospital' subtitle={data?.name_assistance} />
          </GridItem>

          <GridItem>
            <CardDescription title='Contato do hospital' subtitle={data?.contact_assistance} />
          </GridItem>

          <GridItem>
            <CardDescription
              title='Houve alteração de conduta?'
              subtitle={data?.change_conduct ? 'Sim' : 'Não'}
            />
          </GridItem>

          <GridItem md={12}>
            <CardDescription title='Detalhamento' subtitle={data?.detail} />
          </GridItem>

          <GridItem>
            <CardDescription
              title='Qual a evolução do paciente?'
              subtitle={PatientEvolutionDescription[data?.patient_evolution]}
            />
          </GridItem>

          <GridItem>
            <CardDescription
              title='Segue em acompanhamento?'
              subtitle={data?.being_monitored ? 'Sim' : 'Não'}
            />
          </GridItem>

          <GridItem>
            <CardDescription
              title='Liberado por quem?'
              subtitle={data?.who_libered ? WhoLiberedDescription[data?.who_libered] : ''}
            />
          </GridItem>

          <GridItem>
            <CardDescription title='Desfecho' subtitle={data?.outcome} />
          </GridItem>
        </Grid>
      </StyledContentWrapper>
    </StyledContainer>
  )
}
