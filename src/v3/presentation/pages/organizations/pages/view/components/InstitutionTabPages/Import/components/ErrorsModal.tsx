import { Box, List, ListItem, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { ErrorObject } from '@/v3/domain/@v2/import'
import { ModalCard } from '@/v3/presentation/components/Modal'

// Estilizando a lista para adicionar marcadores e remover gaps
const StyledList = styled(List)({
  listStyleType: 'disc',
  paddingLeft: '3rem',
  margin: 0,
  paddingTop: 0,
})

const StyledListItem = styled(ListItem)({
  display: 'list-item',
  padding: 0,
  margin: 0,
})

export const ErrorsModal = ({ errors }: { errors: ErrorObject }) => {
  if (!errors) return null

  return (
    <ModalCard title='Erros de importação' hideCloseButton>
      <Box mt={2}>
        {Object.entries(errors).map(([externalKey, innerObject]) => {
          const numericKey = Number(externalKey)
          return (
            <Box key={numericKey} mt={1}>
              <Box display='flex' gap={1}>
                <Typography fontWeight='bold'>Linha:</Typography>
                <Typography>{externalKey}</Typography>
              </Box>
              <Typography fontWeight='bold'>Erros:</Typography>
              <StyledList>
                {Object.entries(innerObject).map(([internalKey, error]) => (
                  <StyledListItem key={internalKey}>
                    <Typography>{error}</Typography>
                  </StyledListItem>
                ))}
              </StyledList>
            </Box>
          )
        })}
      </Box>
    </ModalCard>
  )
}
