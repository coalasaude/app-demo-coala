import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts'
import { useCallback, useEffect, useState } from 'react'
import { Typography } from '@mui/material'

import { useLazyFetch } from '@/hooks/useFetch'
import { GetAllergyCategory } from '@/types/getAllergyCategory'

import { DashboardContent } from '../styles'

type BarChartData = {
  name: string
  size: number
}

export const AllergyChart = () => {
  const [apiRequest, { data: dataAllergy }] = useLazyFetch<GetAllergyCategory[]>()
  const [allergy, setAllergy] = useState<BarChartData[]>([])

  const getAllergyCategory = useCallback(async () => {
    await apiRequest({
      path: 'dashboard/students-allergy',
      method: 'GET',
    })
  }, [apiRequest])

  useEffect(() => {
    getAllergyCategory()
  }, [getAllergyCategory])

  useEffect(() => {
    if (dataAllergy !== undefined) {
      const barChart = dataAllergy.map((item) => ({
        name: item.name,
        size: item.quantity,
      }))
      setAllergy(barChart)
    }
  }, [dataAllergy])

  return (
    <DashboardContent>
      <Typography variant='h4'>Alergias por categoria</Typography>
      <BarChart data={allergy} width={730} height={250}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='size' name='Categoria' fill='var(--mui-palette-primary-main)' barSize={30} />
      </BarChart>
    </DashboardContent>
  )
}
