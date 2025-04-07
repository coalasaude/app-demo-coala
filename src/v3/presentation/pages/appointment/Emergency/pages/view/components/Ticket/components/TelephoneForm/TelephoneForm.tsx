import { Box, Stack, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'

import { CForm, phoneNormalizer } from '@/components/Forms'
import { FormButtons } from '@/v3/presentation/components/FormButtons'
import { CButton, CDivider, CInputControlled } from '@/v3/presentation/newComponents'
import { useFormEditPersonalData } from '@/v3/presentation/pages/users/components/FormPersonalData'
import { IPersonalDataFormFields } from '@/v3/presentation/pages/users/components/FormPersonalData/schema'
import { useBreakpoint } from '@/hooks/useBreakpoints'

interface IModal {
  onClose: () => void
  id: number
  withDivider?: boolean
}

export const TelephoneForm = ({ id, onClose, withDivider }: IModal) => {
  const isMobile = useBreakpoint('sm')
  const { form, onUpdateUser } = useFormEditPersonalData({
    userId: id,
  })

  const handleSubmit = async () => {
    const body = form.getValues()
    if (body.phone !== '') {
      await onUpdateUser({ phone: body.phone } as IPersonalDataFormFields)
      onClose()
    }
  }

  return (
    <CForm id='myForm' form={form} onSubmit={handleSubmit}>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        px={2}
        pb={2}
        pt={isMobile ? 5 : 1}
      >
        <Typography variant='h4'>Adicionar celular</Typography>
        <CButton variant='link' onClick={onClose}>
          <Close sx={{ color: 'var(--mui-palette-grey-600)' }} />
        </CButton>
      </Stack>
      <Box width='90%' m='auto'>
        <CInputControlled
          placeholder='(__) _____-____'
          name='phone'
          label='Celular'
          transform={{
            output: phoneNormalizer,
            input: phoneNormalizer,
          }}
        />
      </Box>
      <Box pb={2} position={isMobile ? 'fixed' : 'unset'} bottom={0} right={2} width='99%'>
        {withDivider && <CDivider sx={{ my: 2 }} />}
        <FormButtons
          display='flex'
          mt={[0, 2]}
          justifyContent={isMobile ? 'flex-end' : 'center'}
          confirmLabel='Adicionar'
          onConfirm={handleSubmit}
          cancelLabel='Cancelar'
          onCancel={onClose}
          minWidth={['100%', 174]}
        />
      </Box>
    </CForm>
  )
}
