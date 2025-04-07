import { usePostHog } from 'posthog-js/react'
import { Box, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'
import { CForm, CSelectControlled, phoneNormalizer } from '@/components/Forms'
import {
  CButton,
  CInputControlled,
  CRadioButtonGroupControlled,
} from '@/v3/presentation/newComponents'
import { useLayout } from '@/hooks/useLayout'
import { NEW_ROUTES } from '@/constants/routes'
import { addShowOfHandsLPAccess } from '@/v3/domain/@v2/integrations/n8n/show-of-hands-lp access'
import { useMutateUserLookup } from '@/v3/presentation/hooks/api/@v2/users/user-lookup/useMutateUserLookup'
import { CDialogue, useModalContext } from '@/v3/presentation/components/Modal'

import AuthenticationContainer from '../../../components/AuthenticationContainer'
import { registrationSchema, defaultValues } from '../../schema'
import { IFormRegistration } from '../../types'
import { lookingForOptions } from '../../options'

export const RegistrationFormPage = () => {
  const router = useRouter()
  const posthog = usePostHog()
  const { mutateAsync } = useMutateUserLookup()
  const { getCount } = usePageTimeCounter()
  const [other, setOther] = useState(false)
  const { showSnackBar } = useLayout()
  const type = String(router.query.type)
  const { handleModal } = useModalContext()
  
  const form = useForm({
    resolver: yupResolver(registrationSchema),
    defaultValues: {
      ...defaultValues,
      type,
    },
  })
  const lookingFor = form.watch('lookingFor')

  const onSubmit = async (values: IFormRegistration) => {
    const userAlreadyExistsResponse = await mutateAsync({email: values.email, telephone: values.telephone})
    if (userAlreadyExistsResponse[0].exists) {
       handleModal(
            <CDialogue
              title='Atenção!'
              confirmButtonLabel='Ir para o login'
              onConfirm={() => {
                router.push(NEW_ROUTES.UNAUTHENTICATED.LOGIN.path)
              }}
              description={
                <div>
                  <strong>Seu email ou telefone já está no nosso sistema.</strong>
                  <p>
                    Por favor, faça login utilizando esses dados e siga os passos para ativação da conta.
                  </p>
                  <p>Dúvidas? Fale com a gente!</p>            
              </div>
              }
            />,
          )
      return
    }
    posthog.capture('registration_form_submitted', {
      time_on_page: getCount(),
      values: {
        name: values.name,
        email: values.email,
        telephone: values.telephone,
        schoolName: values.schoolName,
        lookingFor: values.lookingFor,
        acceptWhatsApp: values.acceptWhatsApp,
        type: values.type,
        other: values.other,
      },
    })
    addShowOfHandsLPAccess({
      name: values.name,
      acceptWhats: values.acceptWhatsApp,
      email: values.email,
      institutionName: values.schoolName,
      phone: values.telephone,
      type: values.type,
      search: values.lookingFor.join(','),
      explain: values.other
    })
    showSnackBar({
      type: 'success',
      message: 'Formulário enviado com sucesso!',
    })

     router.push(NEW_ROUTES.UNAUTHENTICATED.REGISTRATION.COMPLETE.path)
  }

  useEffect(() => {
    if (Array.isArray(lookingFor) && lookingFor.some((a) => a === 'Outros') && !other) {
      setOther(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lookingFor])

  return (
    <AuthenticationContainer>
      <Typography variant='h1'>Preencha o formulário</Typography>
      <Typography variant='h4' fontWeight={400} mb={4}>
        Em breve um de nossos docs fará contato com você :)
      </Typography>
      <CForm id='myForm' form={form} onSubmit={onSubmit}>
        <CInputControlled
          name='name'
          label='Nome completo*'
          size='small'
          placeholder='Nome completo*'
          fullWidth
          id='name'
        />
        <CInputControlled
          sx={{ mt: 2 }}
          name='email'
          label='E-mail*'
          size='small'
          placeholder='E-mail*'
          fullWidth
          id='email'
        />
        <CInputControlled
          sx={{ mt: 2 }}
          name='telephone'
          label='Celular com DDD*'
          size='small'
          placeholder='Celular com DDD*'
          fullWidth
          transform={{
            output: phoneNormalizer,
            input: phoneNormalizer,
              }}
          id='telephone'
        />
        <CInputControlled
          sx={{ mt: 2, mb: 2 }}
          name='schoolName'
          label='Nome da sua escola'
          size='small'
          placeholder='Nome da sua escola'
          fullWidth
          id='schoolName'
        />
        <CSelectControlled
          name='lookingFor'
          label='O que você busca com a Coala?'
          placeholder='O que você busca com a Coala?'
          multiple
          options={lookingForOptions}
        />
        {other && (
          <CInputControlled
            sx={{ mt: 2 }}
            name='other'
            label='Escreva aqui o que você busca com a Coala'
            size='small'
            placeholder='Escreva aqui o que você busca com a Coala'
            fullWidth
            id='other'
          />
        )}

        <CRadioButtonGroupControlled
          id='acceptWhatsApp'
          name='acceptWhatsApp'
          options={[{ value: true, label: 'Aceito receber informações via WhatsApp' }]}
          sx={{ mt: 4 }}
        />

        <Typography variant='body2' mt={4}>
          Ao clicar abaixo, você concorda em permitir que a Coala Saúde se comunique com você
          através das informações pessoais enviadas acima.
        </Typography>
        <Box mt={4}>
          <CButton variant='primary' fullWidth type='submit'>
            Enviar
          </CButton>
        </Box>
      </CForm>
    </AuthenticationContainer>
  )
}

export default RegistrationFormPage
