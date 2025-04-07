import { cpfNormalizer } from '@/components/Forms'
import { nameNormalizer } from '@/components/Forms/normalizers/nameNormalizer'
import { CInputControlled } from '@/v3/presentation/newComponents'

import { BaseFormData, BaseWrapperFormData } from '../BaseFormData'

export const FormPersonalData = () => {
  return (
    <BaseFormData>
      <BaseWrapperFormData withButton={false}>
        <CInputControlled
          name='name'
          placeholder='Digite o nome'
          label='Nome*'
          transform={{ output: nameNormalizer }}
          fullWidth
        />
      </BaseWrapperFormData>
      <BaseWrapperFormData withButton={false}>
        <CInputControlled
          placeholder='Digite o sobrenome'
          name='lastname'
          label='Sobrenome*'
          transform={{ output: nameNormalizer }}
          fullWidth
        />
      </BaseWrapperFormData>
      <BaseWrapperFormData withButton={false}>
        <CInputControlled
          placeholder='Digite o CPF'
          name='cpf'
          label='CPF'
          transform={{ input: cpfNormalizer, output: cpfNormalizer }}
          fullWidth
        />
      </BaseWrapperFormData>
    </BaseFormData>
  )
}
