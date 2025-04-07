import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { CContainerContent } from '@/v3/presentation/newComponents'
import { PageHeader } from '@/v3/presentation/newComponents'
import { FormChangePhone } from '@/v3/presentation/pages/users/components/FormChangePhone'

export const ChangePhoneEditPage = () => {
  return (
    <>
      <PageHeader title='Alterar telefone' />

      <CBaseContainer>
        <CContainerContent>
          <FormChangePhone />
        </CContainerContent>
      </CBaseContainer>
    </>
  )
}
