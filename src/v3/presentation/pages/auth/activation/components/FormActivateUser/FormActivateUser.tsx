import { Stack, Typography } from '@mui/material'

import { cpfNormalizer } from '@/components/Forms'
import { CCheckBoxControlled } from '@/v3/presentation/newComponents'
import { nameNormalizer } from '@/components/Forms/normalizers/nameNormalizer'
import { CInputControlled } from '@/v3/presentation/newComponents'
import { UserModel } from '@/v3/domain/@v2/users/users.model'

export const FormActivateUser = ({ user }: { user: UserModel }) => {
  return (
    <Stack gap={4}>
      <CInputControlled
        name='name'
        label='Nome'
        placeholder='Digite seu nome'
        size='small'
        disabled={!!user?.name}
        transform={{ output: nameNormalizer }}
        fullWidth
      />
      <CInputControlled
        name='lastname'
        label='Sobrenome'
        placeholder='Digite seu sobrenome'
        size='small'
        disabled={!!user?.lastName}
        transform={{ output: nameNormalizer }}
        fullWidth
      />
      <CInputControlled
        name='cpf'
        label='CPF'
        placeholder='Digite seu CPF'
        size='small'
        transform={{ input: cpfNormalizer }}
        disabled={!!user?.cpf}
        fullWidth
      />
      <CCheckBoxControlled
        name='isSigned'
        size='medium'
        color='primary'
        values={{
          value: 'isSigned',
          label: (
            <span>
              Eu autorizo o uso dos meus dados de acordo com a{' '}
              <Typography
                component='a'
                href='http://coalasaude.com.br/politica-de-privacidade'
                target='_blank'
                rel='noreferrer'
                color='primary.main'
                fontWeight={700}
              >
                Política de Privacidade
              </Typography>{' '}
              e aceito os Termos de 
              <Typography
                component='a'
                href='http://coalasaude.com.br/termos-de-uso'
                target='_blank'
                rel='noreferrer'
                color='primary.main'
                fontWeight={700}
              >
                Condições de Uso
              </Typography>{' '}
              e de{' '}
              <Typography
                component='a'
                href='http://coalasaude.com.br/outorga-de-consentimento'
                target='_blank'
                rel='noreferrer'
                color='primary.main'
                fontWeight={700}
              >
                Outorga de Consentimento.
              </Typography>
            </span>
          ),
        }}
      />
    </Stack>
  )
}
