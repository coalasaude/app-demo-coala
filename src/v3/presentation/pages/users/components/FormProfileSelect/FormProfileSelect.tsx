import { Box, BoxProps, Typography } from '@mui/material'

import { CSelectControlled } from '@/components/Forms'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { InstitutionSelectInputForm } from '@/v3/presentation/newComponents/implementations/form/InstitutionSelectInput/InstitutionSelectInputForm'

export type FormProfileSelectProps = {
  institutionId?: number
  profileOptions?: { value: number; label: string }[]
  disabledInstitutionInput?: boolean
  maxInputWidth?: BoxProps['maxWidth']
}

export const FormProfileSelect = ({
  profileOptions,
  institutionId,
  disabledInstitutionInput,
  maxInputWidth,
}: FormProfileSelectProps) => {
  const { auth } = useAuth()

  const isAdmin = auth.user?.isAdmin

  return (
    <Box>
      <Typography variant='h4' noWrap>
        O usuário pertence a uma instituição?
      </Typography>
      <InstitutionSelectInputForm
        label='Digite a instituição'
        name='institutionId'
        sx={{ mt: 2, maxWidth: maxInputWidth }}
        disabled={disabledInstitutionInput}
        {...(isAdmin && {
          options: [{ value: null, label: 'Sem instituição' }],
        })}
      />
      <Typography variant='h4' noWrap mt={3}>
        Qual é o tipo de usuário?
      </Typography>
      <Box mt={2}>
        <CSelectControlled
          name='profileId'
          sx={{ maxWidth: maxInputWidth }}
          label='Tipo de usuário'
          disabled={institutionId === undefined}
          fullWidth
          options={profileOptions ? profileOptions : []}
        />
      </Box>
    </Box>
  )
}
