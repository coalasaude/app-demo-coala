import { Box } from '@mui/material'

import { PedagogicalRecordType } from '@/v3/domain/@v2/mental-health/enums/pedagogical-record-type.enum'
import { UserModel } from '@/v3/domain/@v2/users/users.model'
import { TabsContainerWrapper } from '@/v3/presentation/components/TabsContainer'
import TabsContainerHeader from '@/v3/presentation/components/TabsContainerHeader'
import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'
import { useBreakpoint } from '@/hooks/useBreakpoints'
import { InterestAreaCategory } from '@/v3/domain/@v2/mental-health/enums/pedagogical-area-type.enum'

import { ContentWrapper } from './components/ContentWrapper/ContentWrapper'
import { LeftSideContent } from './components/LeftSideContent/LeftSideContent'
import { ContentTypeKey, ManageContentMap } from './constants/manage-content.map'

const TabPedagogicalRecords = ({ user }: { user: UserModel }) => {
  const isMobile = useBreakpoint('sm')
  const { queryParam: registerType } = useUrlQueryControl({ queryName: 'registerType' })
  const { queryParam: registerId, setManyQueryParam } = useUrlQueryControl({
    queryName: 'registerId',
  })

  const handleDeseect = () => {
    setManyQueryParam({ registerId: null, registerType: null, category: null })
  }

  const handleSelect = (value: PedagogicalRecordType | null) => {
    setManyQueryParam({ registerType: value || 'DEFAULT', registerId: null, category: null })
  }

  const handleEdit = ({
    id,
    type,
    category,
  }: {
    id: number
    type: PedagogicalRecordType
    category?: InterestAreaCategory
  }) => {
    setManyQueryParam({ registerId: id, registerType: type, category })
  }

  const handleAdd = ({ type }: { type: PedagogicalRecordType }) => {
    setManyQueryParam({ registerId: null, registerType: type, category: null })
  }

  const handleGoToAllRegisters = () => {
    setManyQueryParam({ registerId: null, registerType: null, category: null })
  }

  const type = isMobile ? registerType : registerType || 'DEFAULT'
  const Content = ManageContentMap[type as ContentTypeKey]

  return (
    <TabsContainerWrapper>
      <TabsContainerHeader label='Registros pedagógicos' />
      <Box display={'grid'} gridTemplateColumns={['1fr', '256px 1fr']}>
        <LeftSideContent
          selectedRegisterType={registerType as PedagogicalRecordType}
          setRegisterType={handleSelect}
        />
        {Content && (
          <ContentWrapper onClose={handleDeseect}>
            {Content.component({
              userId: user.id,
              id: Number(registerId),
              onAdd: handleAdd,
              onEdit: handleEdit,
              onBackToRegisters: handleGoToAllRegisters,
            })}
          </ContentWrapper>
        )}
      </Box>
    </TabsContainerWrapper>
  )
}

export default TabPedagogicalRecords
