import { Box } from '@mui/material'

import { CDivider } from '@/v3/presentation/newComponents'
import { GridItem, GridWrapper } from '@/components/Grid'
import { CCheckBoxControlled } from '@/v3/presentation/newComponents'
import { PermissionCategory } from '@/v3/domain/Permission'
import CAccordion from '@/v3/presentation/newComponents/layout/CAccordion'
import CAccordionList from '@/v3/presentation/newComponents/layout/CAccordionList'

export const PermissionAccordionList = ({
  categoryPermissionsList,
}: {
  categoryPermissionsList: PermissionCategory[] | undefined
}) => {
  const accordionListPermission =
    categoryPermissionsList?.map(({ name, permissions: permissionsCategory }) => {
      return {
        title: name,
        children: (
          <>
            <CDivider sx={{ marginY: 2 }} />
            <GridWrapper>
              {permissionsCategory?.map(({ id, description }) => (
                <GridItem xs={12} md={4} key={id}>
                  <CCheckBoxControlled
                    name={`permissions.${String(id)}`}
                    values={{ value: String(id), label: `${description}` }}
                  />
                </GridItem>
              ))}
            </GridWrapper>
          </>
        ),
      }
    }) || []

  return (
    <Box>
      <CAccordionList
        numColumnsMobile={1}
        numColumnsDesktop={1}
        options={accordionListPermission}
        renderItem={(props) => <CAccordion {...props} />}
      />
    </Box>
  )
}

export default PermissionAccordionList
