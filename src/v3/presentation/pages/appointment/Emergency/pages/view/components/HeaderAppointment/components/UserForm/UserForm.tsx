import { Box, Stack, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { usePostHog } from 'posthog-js/react'

import { CForm } from '@/components/Forms'
import { CButton, CDivider } from '@/v3/presentation/newComponents'
import { useBreakpoint } from '@/hooks/useBreakpoints'
import { useMutateAddBodyMass } from '@/v3/presentation/hooks/api/@v2/health-history/body-mass/useMutateAddBodyMass'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'
import { FormButtons } from '@/v3/presentation/components/FormButtons'

import { schemaUser } from './schema'
import { FormUser } from './components/UserForm'

interface IModal {
  onClose: () => void
  id: number
  withDivider?: boolean
}

export const UserForm = ({ id, onClose, withDivider }: IModal) => {
  const isMobile = useBreakpoint('sm')
  const form = useForm({
    resolver: yupResolver(schemaUser),
  })
  const { mutateAsync: addBodyMass } = useMutateAddBodyMass()
  const { getCount, resetCounting } = usePageTimeCounter()
  const posthog = usePostHog()

  const onSubmit = async () => {
    if (!id) return

    const body = form.getValues()
    if (body.measurementDate && (body.height || body.weight)) {
      await addBodyMass({
        height: Number(body?.height?.replace(/,/g, '')),
        weight: Number(body.weight),
        measurementDate: body.measurementDate,
        userId: id,
      })
    }

    posthog.capture('user_update_general_data_on_appointment', {
      time_spent: getCount(),
    })
    resetCounting()

    onClose()
  }

  return (
    <CForm id='userForm' form={form} onSubmit={form.handleSubmit(onSubmit)}>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        pb={2}
        pt={isMobile ? 5 : 1}
      >
        <Typography variant='h4'>Informações gerais</Typography>
        <CButton variant='link' onClick={onClose}>
          <Close sx={{ color: 'var(--mui-palette-grey-600)' }} />
        </CButton>
      </Stack>
      <FormUser />
      <Box pb={2} position={isMobile ? 'fixed' : 'unset'} bottom={0} right={2} width='99%'>
        {withDivider && <CDivider sx={{ my: 2 }} />}
        <FormButtons
          display='flex'
          mt={[0, 2]}
          justifyContent={isMobile ? 'flex-end' : 'center'}
          confirmLabel='Atualizar'
          cancelLabel='Cancelar'
          formId='userForm'
          onCancel={onClose}
          minWidth={['100%', 174]}
        />
      </Box>
    </CForm>
  )
}
