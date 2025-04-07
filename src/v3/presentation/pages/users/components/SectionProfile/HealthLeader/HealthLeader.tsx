import { Box, Typography } from '@mui/material'

import HealthLeader from '/public/assets/svg/User/HealthLeader.svg'

import CSwitch from '@/v3/presentation/newComponents/atoms/CSwitch'
import { useModalContext } from '@/v3/presentation/components/Modal'

import { StyledHealthLeader } from './styles'
import HealthLeaderModal from './components/HealthLeaderModal'

export const HealthLeaderComponent = ({
  isHealthLeader,
  hasUpdateHealthLeader,
  roleId,
  institutionId,
  refetch,
}: {
  hasUpdateHealthLeader: boolean
  institutionId: number
  isHealthLeader: boolean
  roleId: number
  refetch: () => void
}) => {
  const { handleModal } = useModalContext()

  const handleUpdateHealthLeader = async (id: number) => {
    handleModal(
      <HealthLeaderModal id={id} institutionId={institutionId} isHealthLeader={isHealthLeader} />,
    )
    refetch()
  }

  return (
    <StyledHealthLeader>
      <Box display='flex'>
        <HealthLeader />
        <Typography variant='h6' ml={1}>
          Líder de saúde
        </Typography>
      </Box>
      <Box display='flex' justifyContent='flex-end'>
        <CSwitch
          color='primary'
          className='switch'
          disabled={!hasUpdateHealthLeader}
          checked={isHealthLeader}
          onClick={(e) => {
            e.stopPropagation()
            handleUpdateHealthLeader(roleId)
          }}
        />
      </Box>
    </StyledHealthLeader>
  )
}

export default HealthLeaderComponent
