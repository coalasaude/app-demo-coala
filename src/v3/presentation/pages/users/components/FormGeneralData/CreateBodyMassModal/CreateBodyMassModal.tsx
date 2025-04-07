import { useState } from 'react'
import { Box, CircularProgress, Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'

import { ModalCard, useModalContext } from '@/v3/presentation/components/Modal'
import { CDatePickerControlled, CForm } from '@/components/Forms'
import { spacing } from '@/v3/presentation/utils/spacing'
import Button from '@/v3/presentation/components/Button'
import { onlyNumsNormalizer } from '@/components/Forms/normalizers/onlyNumsNormalizer'
import PageTitle from '@/v3/presentation/newComponents/layout/PageTitle'
import { CInputControlled } from '@/v3/presentation/newComponents'
import { useMutateAddBodyMass } from '@/v3/presentation/hooks/api/@v2/health-history/body-mass/useMutateAddBodyMass'

import { bodyMassSchema, bodyMassDefaultValues } from './schema'

export const CreateBodyMassModal: React.FC = () => {
  const router = useRouter()
  const userId = Number(router.query.userId as string)

  const { handleModal } = useModalContext()
  const [isLoading, setIsLoading] = useState(false)
  const { mutateAsync: createMutateBodyMass } = useMutateAddBodyMass()
  const form = useForm({
    resolver: yupResolver(bodyMassSchema),
    defaultValues: bodyMassDefaultValues,
  })

  const handleCreateBodyMass = async (data: {
    weight: string
    height: string
    measurementDate: Date
  }) => {
    if (!userId) return
    setIsLoading(true)
    await createMutateBodyMass({
      height: Number(data.height.replace(/,/g, '')),
      weight: Number(data.weight),
      measurementDate: data.measurementDate,
      userId: userId,
    }).finally(() => setIsLoading(false))
    handleModal()
  }

  return (
    <ModalCard>
      <CForm form={form} onSubmit={handleCreateBodyMass}>
        <Box>
          <PageTitle>Atualizar altura e peso</PageTitle>
          <Grid container spacing={2} mt={spacing(2)} mb={spacing(3)}>
            <Grid item xs={12}>
              <CDatePickerControlled
                name='measurementDate'
                label='Data da medição*'
                maxDate={dayjs()}
              />
            </Grid>
            <Grid item xs={6}>
              <CInputControlled
                placeholder='Digite a altura em cm'
                name='height'
                label='Altura (em cm)'
                transform={{
                  output: [onlyNumsNormalizer],
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <CInputControlled
                placeholder='Digite o peso em kg'
                name='weight'
                label='Peso (em kg)'
                transform={{
                  output: [onlyNumsNormalizer],
                }}
              />
            </Grid>
          </Grid>
          <Button type='submit' fullWidth>
            {isLoading ? <CircularProgress color='inherit' size={20} /> : 'Salvar'}
          </Button>
        </Box>
      </CForm>
    </ModalCard>
  )
}
