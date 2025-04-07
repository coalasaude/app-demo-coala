import { Box, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { usePostHog } from 'posthog-js/react'

import { CForm } from '@/components/Forms'
import { FormButtons } from '@/v3/presentation/components/FormButtons'
import { CDivider } from '@/v3/presentation/newComponents'
import { useBreakpoint } from '@/hooks/useBreakpoints'
import { useMutateAddAllergy } from '@/v3/presentation/hooks/api/@v2/health-history/allergies/useMutateAddAllergy'
import { useFetchBrowseAllergyCategory } from '@/v3/presentation/hooks/api/@v2/health-history/allergies/useFetchBrowseAllergyCategory'
import { useFetchBrowseAllergySymptom } from '@/v3/presentation/hooks/api/@v2/health-history/allergies/useFetchBrowseAllergySymptoms'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'
import { useMutateEditUser } from '@/v3/presentation/hooks/api/@v2/users/users/useMutateEditUser'

import { FormAllergy } from './components/AllergyForm'
import { schemaAllergy } from './schema'

interface IModal {
  onClose: (options?: { shouldRefetch?: boolean }) => void
  id: number
  withDivider?: boolean
}

export const AllergyForm = ({ id, onClose, withDivider }: IModal) => {
  const isMobile = useBreakpoint('sm')
  const form = useForm({
    resolver: yupResolver(schemaAllergy),
  })
  const { mutateAsync: addAllergy } = useMutateAddAllergy()
  const { mutateAsync: updateUser } = useMutateEditUser()
  const { categories } = useFetchBrowseAllergyCategory()
  const { symptoms } = useFetchBrowseAllergySymptom()
  const { getCount, resetCounting } = usePageTimeCounter()
  const posthog = usePostHog()

  const categoryOptions =
    categories?.data?.map(({ id, name }) => ({
      value: id,
      label: name,
    })) || []

  const allergyOptionsSymptoms =
    symptoms?.data?.map(({ id, name }) => ({
      value: id,
      label: name,
    })) || []

  const onSubmit = async () => {
    if (!id) return

    const body = form.getValues()

    if (body.deniesAllergies) {
      await updateUser({ deniesAllergies: true, userId: id })
    }

    if (body.categoryId && body.causerAgent && body.symptom && !body.deniesAllergies) {
      await addAllergy({
        otherCategory: body.otherCategory || '',
        categoryId: Number(body.categoryId),
        causerAgent: body.causerAgent,
        orientations: body.orientations || '',
        symptoms: body.symptom,
        userId: id,
      })
    }

    posthog.capture('user_update_general_data_on_appointment', {
      time_spent: getCount(),
    })
    resetCounting()

    onClose({ shouldRefetch: body.deniesAllergies })
  }

  return (
    <CForm id='userAllergyForm' form={form} onSubmit={form.handleSubmit(onSubmit)}>
      <Typography variant='h4' py={2}>
        Alergia
      </Typography>
      <FormAllergy
        categoryOptions={categoryOptions}
        symptomOptions={allergyOptionsSymptoms}
        watch={form.watch}
        id={id}
      />
      <Box pb={2} position={isMobile ? 'fixed' : 'unset'} bottom={0} right={2} width='99%'>
        {withDivider && <CDivider sx={{ my: 2 }} />}
        <FormButtons
          display='flex'
          mt={[0, 2]}
          justifyContent={isMobile ? 'flex-end' : 'center'}
          confirmLabel='Atualizar'
          cancelLabel='Cancelar'
          formId='userAllergyForm'
          onCancel={onClose}
          minWidth={['100%', 174]}
        />
      </Box>
    </CForm>
  )
}
