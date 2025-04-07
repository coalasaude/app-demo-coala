import { FC } from 'react'
import { useRouter } from 'next/router'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { cleanTelephone } from '@/utils/cleanTelephone'
import { isValidPhone } from '@/validators/phone'
import { phoneNormalizer } from '@/components/Forms'
import { useFetchIndicationList } from '@/v3/presentation/hooks/useFetchIndicationList'
import { useLayout } from '@/hooks/useLayout'

import {
  StyledActionsContainer,
  StyledButton,
  StyledContainer,
  StyledForm,
  StyledStack,
  StyledTextField,
  StyledTitleWrapper,
} from './styles'

interface TFormInputs {
  schoolName: string
  schoolManagerName: string
  schoolManagerEmail: string
  schoolManagerWhatsapp: string
  schoolCity: string
  schoolState: string
  schoolStudentsNumber: number
  schoolMonthlyPayment: number
}

const schema = yup
  .object({
    schoolName: yup.string().required(),
    schoolManagerName: yup.string().required(),
    schoolManagerEmail: yup.string().email().required(),
    schoolManagerWhatsapp: yup
      .string()
      .test(
        'is-valid-phone',
        'Telefone inválido',
        (value) => !!value && isValidPhone(cleanTelephone(value)),
      )
      .required(),
    schoolCity: yup.string().required(),
    schoolState: yup.string().required(),
    schoolStudentsNumber: yup.number().moreThan(149).positive().integer().required(),
    schoolMonthlyPayment: yup.number().moreThan(399).positive().required(),
  })
  .required()

const IndicationForm: FC = () => {
  const { back } = useRouter()
  const { showSnackBar } = useLayout()
  const { addIndication } = useFetchIndicationList()
  const formMethods = useForm<TFormInputs>({
    resolver: yupResolver(schema),
  })

  const handleOnSubmit: SubmitHandler<TFormInputs> = (data) => {
    addIndication({
      fantasyName: data.schoolName,
      managerName: data.schoolManagerName,
      managerEmail: data.schoolManagerEmail,
      managerPhone: data.schoolManagerWhatsapp,
      state: data.schoolState,
      city: data.schoolCity,
      numberStudents: data.schoolStudentsNumber,
      monthlyPayment: data.schoolMonthlyPayment,
    })
    back()
    showSnackBar({
      message: 'Indicação realizada com sucesso!',
      type: 'success',
    })
  }

  return (
    <FormProvider {...formMethods}>
      <StyledContainer>
        <StyledTitleWrapper>
          Preencha abaixo as informações da escola que você deseja indicar:
        </StyledTitleWrapper>

        <StyledForm onSubmit={formMethods.handleSubmit(handleOnSubmit)}>
          <StyledStack>
            <StyledTextField
              error={!!formMethods.formState.errors.schoolName?.message}
              helperText={formMethods.formState.errors.schoolName?.message}
              label='Nome da escola*'
              placeholder='Digite o nome da escola*'
              size='small'
              name='schoolName'
            />
          </StyledStack>

          <StyledStack>
            <StyledTextField
              placeholder='Digite o nome do(a) gestor(a) escolar*'
              error={!!formMethods.formState.errors.schoolManagerName?.message}
              helperText={formMethods.formState.errors.schoolManagerName?.message}
              label='Nome do(a) gestor(a) escolar*'
              size='small'
              name='schoolManagerName'
            />
          </StyledStack>

          <StyledStack>
            <StyledTextField
              placeholder='Digite o e-mail do(a) gestor(a) escolar*'
              error={!!formMethods.formState.errors.schoolManagerEmail?.message}
              helperText={formMethods.formState.errors.schoolManagerEmail?.message}
              label='E-mail do(a) gestor(a) escolar*'
              size='small'
              name='schoolManagerEmail'
            />
          </StyledStack>

          <StyledStack>
            <StyledTextField
              placeholder='Digite o WhatsApp do(a) gestor(a) escolar*'
              error={!!formMethods.formState.errors.schoolManagerWhatsapp?.message}
              helperText={formMethods.formState.errors.schoolManagerWhatsapp?.message}
              label='WhatsApp do(a) gestor(a) escolar*'
              size='small'
              name='schoolManagerWhatsapp'
              transform={{
                input: phoneNormalizer,
              }}
            />
          </StyledStack>

          <StyledStack>
            <StyledTextField
              error={!!formMethods.formState.errors.schoolCity?.message}
              helperText={formMethods.formState.errors.schoolCity?.message}
              placeholder='Digite a cidade da escola*'
              label='Cidade*'
              size='small'
              name='schoolCity'
            />
          </StyledStack>

          <StyledStack>
            <StyledTextField
              error={!!formMethods.formState.errors.schoolState?.message}
              helperText={formMethods.formState.errors.schoolState?.message}
              placeholder='Digite a UF da escola*'
              label='UF*'
              size='small'
              name='schoolState'
            />
          </StyledStack>

          <StyledStack>
            <StyledTextField
              error={!!formMethods.formState.errors.schoolStudentsNumber?.message}
              helperText={formMethods.formState.errors.schoolStudentsNumber?.message}
              label='Número de alunos*'
              size='small'
              name='schoolStudentsNumber'
              placeholder='Digite o número de alunos*'
              type='number'
            />
          </StyledStack>

          <StyledStack>
            <StyledTextField
              error={!!formMethods.formState.errors.schoolMonthlyPayment?.message}
              helperText={formMethods.formState.errors.schoolMonthlyPayment?.message}
              label='Valor médio da mensalidade*'
              size='small'
              name='schoolMonthlyPayment'
              placeholder='Digite o valor médio da mensalidade*'
              inputType='currency'
            />
          </StyledStack>

          <StyledActionsContainer>
            <StyledButton type='submit'>Enviar</StyledButton>
            <StyledButton variant='outlined' onClick={back}>
              Cancelar
            </StyledButton>
          </StyledActionsContainer>
        </StyledForm>
      </StyledContainer>
    </FormProvider>
  )
}

export default IndicationForm
