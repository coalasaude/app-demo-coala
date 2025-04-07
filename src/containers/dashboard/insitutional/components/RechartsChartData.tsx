import { Box, Typography } from '@mui/material'
import {
  CartesianGrid,
  Legend,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts'
import { orderBy, random, range } from 'lodash'

import { GridItem, GridWrapper } from '@/components/Grid'

import { DashboardContent } from '../styles'

import { VaccineCovidChart } from './VaccineCovidChart'
import { AllergyChart } from './AllergyChart'
import { AppointmentFinishedChart } from './AppointmentFinishedChart'
import { MedicalRecordMonthlyChart } from './MedicalRecordsMonthlyChart'

const scatterChart = orderBy(
  range(0, 100).map(() => ({
    x: random(14, 40),
    y: Math.floor(Math.random() * 10),
    z: Math.floor(Math.random() * 150),
  })),
  'x'
)

export const ChartDashboardData = () => {
  return (
    <Box mt={2}>
      <GridWrapper>
        <GridItem xs={12} md={4}>
          <MedicalRecordMonthlyChart />
        </GridItem>
        <GridItem xs={12} md={4}>
          <AppointmentFinishedChart />
        </GridItem>
        <GridItem xs={12} md={4}>
          <VaccineCovidChart />
        </GridItem>
        <GridItem xs={12} md={6}>
          <AllergyChart />
        </GridItem>
        <GridItem xs={12} md={6}>
          <DashboardContent>
            <Typography variant='h4'>IMC por idade</Typography>
            <ScatterChart width={730} height={250}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='x' name='imc' unit='kg/m²' />
              <YAxis dataKey='y' name='Idade' unit='anos' />
              <ZAxis dataKey='z' range={[64, 144]} name='score' unit='km' />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter name='Alunos' data={scatterChart} fill='#8884d8' isAnimationActive={false} />
            </ScatterChart>
          </DashboardContent>
        </GridItem>
      </GridWrapper>
    </Box>
  )
}

export default ChartDashboardData
