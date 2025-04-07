import { Box, Typography } from '@mui/material'
import { useCallback, useEffect } from 'react'
import {
  CastForEducation,
  Class,
  EscalatorWarning,
  FactCheck,
  Portrait,
  Vaccines,
} from '@mui/icons-material'

import { ViewSkeleton } from '@/components/Skeletons/ViewSkeleton'
import { useLazyFetch } from '@/hooks/useFetch'
import { GridItem, GridWrapper } from '@/components/Grid'
import { GeneralDataDashboard } from '@/types/generalDataDashboard'

import { DashboardContent } from '../styles'

import ChartDashboardData from './RechartsChartData'

export const GeneralDashboardData = () => {
  const [apiRequest, { data }] = useLazyFetch<GeneralDataDashboard>()

  const getGeneralData = useCallback(async () => {
    await apiRequest({
      path: 'dashboard/general-data',
      method: 'GET',
    })
  }, [apiRequest])

  useEffect(() => {
    getGeneralData()
  }, [getGeneralData])

  if (data === undefined) {
    return <ViewSkeleton />
  }

  return (
    <>
      <GridWrapper>
        <GridItem xs={12} md={2}>
          <DashboardContent>
            <GridWrapper>
              <GridItem xs={12} md={12}>
                <Box>
                  <CastForEducation sx={{ fontSize: '3.3rem' }} color='primary' />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '1.1rem' }}>Nome da instituição</Typography>
                  <Typography variant='h4' sx={{ color: 'var(--mui-palette-grey-800)' }}>
                    {data.institution.fantasy_name}
                  </Typography>
                </Box>
              </GridItem>
            </GridWrapper>
          </DashboardContent>
        </GridItem>
        <GridItem xs={12} md={2}>
          <DashboardContent>
            <GridWrapper>
              <GridItem xs={12} md={12}>
                <Box>
                  <EscalatorWarning sx={{ fontSize: '3.3rem' }} color='primary' />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '1.1rem' }}>
                    Alunos cadastrados na plataforma
                  </Typography>
                  <Typography variant='h4' sx={{ color: 'var(--mui-palette-grey-800)' }}>
                    {data.students}
                  </Typography>
                </Box>
              </GridItem>
            </GridWrapper>
          </DashboardContent>
        </GridItem>
        <GridItem xs={12} md={2}>
          <DashboardContent>
            <GridWrapper>
              <GridItem xs={12} md={12}>
                <Box>
                  <Portrait sx={{ fontSize: '3.3rem' }} color='primary' />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '1.1rem' }}>
                    Colaboradores cadastrados na plataforma
                  </Typography>
                  <Typography variant='h4' sx={{ color: 'var(--mui-palette-grey-800)' }}>
                    {data.colaborators}
                  </Typography>
                </Box>
              </GridItem>
            </GridWrapper>
          </DashboardContent>
        </GridItem>
        <GridItem xs={12} md={2}>
          <DashboardContent>
            <GridWrapper>
              <GridItem xs={12} md={12}>
                <Box>
                  <FactCheck sx={{ fontSize: '3.3rem' }} color='primary' />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '1.1rem' }}>
                    Alunos com ficha de saúde cadastrada
                  </Typography>
                  <Typography variant='h4' sx={{ color: 'var(--mui-palette-grey-800)' }}>
                    {Math.round(data.studentsWithMedicalRecord)}%
                  </Typography>
                </Box>
              </GridItem>
            </GridWrapper>
          </DashboardContent>
        </GridItem>
        <GridItem xs={12} md={2}>
          <DashboardContent>
            <GridWrapper>
              <GridItem xs={12} md={12}>
                <Box>
                  <Class sx={{ fontSize: '3.3rem' }} color='primary' />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '1.1rem' }}>
                    Colaboradores com ficha de saúde cadastrada
                  </Typography>
                  <Typography variant='h4' sx={{ color: 'var(--mui-palette-grey-800)' }}>
                    {Math.round(data.colaboratorsWithMedicalRecord)}%
                  </Typography>
                </Box>
              </GridItem>
            </GridWrapper>
          </DashboardContent>
        </GridItem>
        <GridItem xs={12} md={2}>
          <DashboardContent>
            <GridWrapper>
              <GridItem xs={12} md={12}>
                <Box>
                  <Vaccines sx={{ fontSize: '3.3rem' }} color='primary' />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '1.1rem' }}>
                    Alunos com cartão de vacinação registrado
                  </Typography>
                  <Typography variant='h4' sx={{ color: 'var(--mui-palette-grey-800)' }}>
                    {Math.round(data.studentsWithVaccine)}%
                  </Typography>
                </Box>
              </GridItem>
            </GridWrapper>
          </DashboardContent>
        </GridItem>
      </GridWrapper>
      <ChartDashboardData />
    </>
  )
}

export default GeneralDashboardData
