import { Box, Button, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import Paper from '@/v3/presentation/components/Paper'
import { GridItem, GridWrapper } from '@/components/Grid'
import { Permissions } from '@/types/permissions'
import { CCheckBoxControlled } from '@/v3/presentation/newComponents'
import ContentWrapper from '@/v3/presentation/components/layout/ContentWrapper'

export const PlanForm = ({ permissions }: { permissions: Permissions[] | undefined }) => {
  const { watch, setValue } = useFormContext()
  const formPermissions = watch('permissions')

  const isAllSelected = !Object.keys(formPermissions || {})?.some((key) => !formPermissions?.[key])

  return (
    <Paper>
      <ContentWrapper>
        <Typography variant='h4' mb={2}>
          Permissões
        </Typography>
        <Box>
          <GridWrapper>
            <GridItem xs={12}>
              <Button
                variant='contained'
                onClick={() => {
                  if (!isAllSelected) {
                    setValue(
                      'permissions',
                      permissions?.reduce((result, { id }) => {
                        return {
                          ...result,
                          [id]: true,
                        }
                      }, {}),
                    )
                  } else {
                    setValue(
                      'permissions',
                      permissions?.reduce((result, { id }) => {
                        return {
                          ...result,
                          [id]: false,
                        }
                      }, {}),
                    )
                  }
                }}
              >
                {isAllSelected ? 'Desselecionar todos' : 'Selecionar todos'}
              </Button>
            </GridItem>
            {permissions?.map(({ id, description, name }) => (
              <GridItem xs={12} md={4} key={id}>
                <CCheckBoxControlled
                  name={`permissions.${String(id)}`}
                  values={{ value: String(id), label: `${name}: ${description}` }}
                />
              </GridItem>
            ))}
          </GridWrapper>
        </Box>
      </ContentWrapper>
    </Paper>
  )
}

export default PlanForm
