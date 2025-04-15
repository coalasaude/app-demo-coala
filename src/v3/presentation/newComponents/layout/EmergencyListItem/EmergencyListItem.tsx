import { Box, Typography } from '@mui/material'
import { HealthAndSafety } from '@mui/icons-material'

import { AnimatedListItemText } from '../CSideBar/styles'
import { CTooltip } from '../..'

import { StyledEmergencyButton } from './styles'

export const EmergencyListItem = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <Box
      mx={isOpen ? 2 : 0}
      sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
      className='cursor-pointer'
      data-testid='UrgencyButton'
    >
      <CTooltip description={isOpen ? '' : 'Chamar ajuda'} placement='right'>
        <StyledEmergencyButton isOpen={isOpen}>
          <HealthAndSafety sx={{ color: 'var(--mui-palette-common-white) ' }} />
          {isOpen && (
            <Box>
              <AnimatedListItemText
                isOpen={isOpen}
              >
                <Typography color={'var(--mui-palette-common-white)'} fontSize={'22px !important'} fontWeight={600}>
                  Chamar ajuda
                </Typography>
              </AnimatedListItemText>
            </Box>
          )}
        </StyledEmergencyButton>
      </CTooltip>
    </Box>
  )
}

export default EmergencyListItem
