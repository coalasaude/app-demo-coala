import { useRouter } from 'next/router'
import { Box, Stack, Typography } from '@mui/material'

import {
  StyledContainer,
  StyledButton,
  StyledModalTitle,
} from '@/v3/presentation/newComponents/layout/CDialogue/styles'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { useMutateEditRoleHealthLeader } from '@/v3/presentation/hooks/api/@v2/users/roles/useMutateEditRoleHealthLeader'
import { ModalCard, useModalContext } from '@/v3/presentation/components/Modal'

type Props = {
  id: number
  institutionId: number
  isHealthLeader: boolean
}

export const HealthLeaderModal = ({ isHealthLeader, institutionId, id }: Props) => {
  const { handleModal } = useModalContext()
  const router = useRouter()
  const { setAuth } = useAuth()
  const editRoleHealthLeaderMutate = useMutateEditRoleHealthLeader()

  const handleUpdateHealthLeader = async () => {
    setAuth({
      selectedInstitution: institutionId,
    })
    await editRoleHealthLeaderMutate.mutateAsync({
      isHealthLeader: !isHealthLeader,
      roleId: id,
      userId: Number(router.query.userId),
    })

    setAuth({
      selectedInstitution: undefined,
    })
    handleClose()
  }

  const handleClose = () => {
    handleModal()
  }

  const initialDescription = isHealthLeader ? 'desabilitar' : 'habilitar'

  return (
    <ModalCard onClose={handleClose} sx={{ maxWidth: 384 }}>
      <StyledContainer>
        <StyledModalTitle variant='h2'>Atenção</StyledModalTitle>
        <Box>
          <Typography component='span' variant='h4' fontWeight={500}>
            Deseja {initialDescription} as permissões de{' '}
            <Typography component='span' variant='h4'>
              {' '}
              Líder de saúde
            </Typography>{' '}
            para esse perfil?
          </Typography>
        </Box>

        <Stack spacing={2} mt={2} direction='row' justifyContent='flex-end'>
          <StyledButton fullWidth size='small' variant='outlined' onClick={handleClose}>
            Não
          </StyledButton>
          <StyledButton fullWidth size='small' onClick={handleUpdateHealthLeader}>
            Sim
          </StyledButton>
        </Stack>
      </StyledContainer>
    </ModalCard>
  )
}

export default HealthLeaderModal
